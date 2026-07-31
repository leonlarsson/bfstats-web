import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type HScrollProps = {
  children: ReactNode;
  /** Spread onto the scrolling track, so callers can set role/aria for its contents. */
  trackProps?: ComponentPropsWithoutRef<"div">;
  className?: string;
};

/**
 * One row that scrolls sideways instead of wrapping. Touch swipes it natively; a mouse
 * gets drag-to-scroll and a paging arrow at each end, since the scrollbar is hidden.
 */
export const HScroll = ({ children, trackProps, className }: HScrollProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const dragState = useRef<{ startX: number; startScroll: number } | null>(null);
  const dragMoved = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () =>
      setCanScroll({
        left: el.scrollLeft > 4,
        right: el.scrollLeft < el.scrollWidth - el.clientWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    // Watch the children too — swapping games changes content width without resizing the track.
    const observer = new ResizeObserver(update);
    observer.observe(el);
    for (const child of Array.from(el.children)) observer.observe(child);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  /** One item plus its gap, measured off the real layout rather than assumed. */
  const stepSize = (el: HTMLDivElement) => {
    const [first, second] = Array.from(el.children) as HTMLElement[];
    if (first && second) return second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    return first ? first.getBoundingClientRect().width : el.clientWidth * 0.8;
  };

  const page = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * stepSize(el), behavior: reduced ? "instant" : "smooth" });
  };

  // Drag-to-scroll for mouse users. Touch keeps native scrolling and snap.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    dragState.current = { startX: e.clientX, startScroll: el.scrollLeft };
    dragMoved.current = false;
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 5 && !dragMoved.current) {
      dragMoved.current = true;
      // Snap fights manual positioning; turn it off for the duration of the drag.
      el.style.scrollSnapType = "none";
      el.setPointerCapture(e.pointerId);
    }
    if (dragMoved.current) el.scrollLeft = dragState.current.startScroll - dx;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    dragState.current = null;
    if (!el || !dragMoved.current) return;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    el.style.scrollSnapType = "";
  };

  // A drag that finishes on top of an item must not also activate it. Capturing here
  // means items stay plain buttons and never have to know about the drag.
  const onClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!dragMoved.current) return;
    dragMoved.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={cn("relative -mx-4 lg:-mx-8", className)}>
      <div
        {...trackProps}
        className={cn(
          "flex snap-x gap-4 overflow-x-auto scroll-pl-4 px-4 pb-2 [scrollbar-width:none] lg:scroll-pl-8 lg:px-8 [&::-webkit-scrollbar]:hidden",
          canScroll.left || canScroll.right ? "cursor-grab active:cursor-grabbing" : "",
          trackProps?.className,
        )}
        onClickCapture={onClickCapture}
        onPointerCancel={endDrag}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        ref={trackRef}
      >
        {children}
      </div>

      {/* Hints that content continues past the edge. */}
      {canScroll.left && (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r from-background to-transparent" />
      )}
      {canScroll.right && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-l from-background to-transparent" />
      )}

      <ScrollArrow direction={-1} disabled={!canScroll.left} onClick={() => page(-1)} />
      <ScrollArrow direction={1} disabled={!canScroll.right} onClick={() => page(1)} />
    </div>
  );
};

const ScrollArrow = ({
  direction,
  disabled,
  onClick,
}: {
  direction: 1 | -1;
  disabled: boolean;
  onClick: () => void;
}) => {
  const Icon = direction === 1 ? ChevronRightIcon : ChevronLeftIcon;

  return (
    <button
      aria-label={direction === 1 ? "Scroll right" : "Scroll left"}
      className={cn(
        "clip-btn absolute top-1/2 hidden size-10 -translate-y-1/2 cursor-pointer items-center justify-center",
        "border bg-background/85 backdrop-blur transition-[opacity,border-color,color] sm:flex",
        "text-muted-foreground hover:border-primary/60 hover:text-foreground",
        direction === 1 ? "right-2 lg:right-4" : "left-2 lg:left-4",
        disabled ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon className="size-5" />
    </button>
  );
};
