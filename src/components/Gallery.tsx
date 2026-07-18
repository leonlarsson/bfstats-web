import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";

export type GalleryImage = {
  src: string;
  game: string;
  segment: string;
};

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/example_bf6.png", game: "Battlefield 6", segment: "Overview" },
  { src: "/images/example_bf6w.png", game: "Battlefield 6", segment: "Weapons" },
  { src: "/images/example_bf6v.gif", game: "Battlefield 6", segment: "Vehicles (GIF)" },
  { src: "/images/example_bf2042.png", game: "Battlefield 2042", segment: "Overview" },
  { src: "/images/example_bfv.png", game: "Battlefield V", segment: "Overview" },
  { src: "/images/example_bf1.png", game: "Battlefield 1", segment: "Overview" },
  { src: "/images/example_bfh.png", game: "Battlefield Hardline", segment: "Overview" },
  { src: "/images/example_bf4.png", game: "Battlefield 4", segment: "Overview" },
  { src: "/images/example_bf3.png", game: "Battlefield 3", segment: "Overview" },
  { src: "/images/example_bf2.png", game: "Battlefield 2", segment: "Overview" },
];

export const imageForGame = (gameName: string): GalleryImage | undefined =>
  GALLERY_IMAGES.find((image) => image.game === gameName);

/**
 * Horizontal gallery of the bot's example outputs. Native CSS scroll-snap (swipeable on
 * touch), plus arrow buttons and drag-to-scroll for mouse users. Click a card to enlarge.
 */
export const GalleryStrip = ({ onSelect }: { onSelect: (image: GalleryImage) => void }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });
  const dragState = useRef<{ startX: number; startScroll: number } | null>(null);
  const dragMoved = useRef(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () =>
      setCanScroll({
        left: el.scrollLeft > 4,
        right: el.scrollLeft < el.scrollWidth - el.clientWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("button");
    el.scrollBy({ left: direction * ((card?.clientWidth ?? 400) + 16), behavior: "instant" });
  };

  // Drag-to-scroll for mouse users. Touch keeps native scrolling + snap.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = { startX: e.clientX, startScroll: el.scrollLeft };
    dragMoved.current = false;
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 5 && !dragMoved.current) {
      dragMoved.current = true;
      // Snap fights manual scroll positioning; disable it while dragging.
      el.style.scrollSnapType = "none";
      el.setPointerCapture(e.pointerId);
    }
    if (dragMoved.current) el.scrollLeft = dragState.current.startScroll - dx;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    dragState.current = null;
    if (!el || !dragMoved.current) return;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    el.style.scrollSnapType = "";
  };

  return (
    <div className="relative -mx-4 lg:-mx-8">
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 px-4 pb-2 [scrollbar-width:none] lg:scroll-pl-8 lg:px-8 [&::-webkit-scrollbar]:hidden"
        onPointerCancel={endDrag}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        ref={scrollerRef}
      >
        {GALLERY_IMAGES.map((image) => (
          <button
            className="panel clip-notch-sm group w-[320px] shrink-0 cursor-pointer snap-start text-left transition-colors hover:border-primary/60 sm:w-[420px]"
            key={image.src}
            onClick={() => {
              // A drag that ends on a card shouldn't open it.
              if (dragMoved.current) {
                dragMoved.current = false;
                return;
              }
              onSelect(image);
            }}
            type="button"
          >
            <img
              alt={`${image.game} ${image.segment} example output`}
              className="pointer-events-none aspect-[1200/750] w-full object-cover"
              draggable={false}
              height={750}
              loading="lazy"
              src={image.src}
              width={1200}
            />
            <span className="flex items-baseline justify-between gap-2 border-t px-3 py-2">
              <span className="truncate text-sm font-bold">{image.game}</span>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-primary">
                {image.segment}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Edge fades — subtle hints that there is more content */}
      {canScroll.left && (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r from-background/60 to-transparent" />
      )}
      {canScroll.right && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-l from-background/60 to-transparent" />
      )}

      {/* Arrows — mouse affordance; touch users swipe */}
      <GalleryArrow direction={-1} disabled={!canScroll.left} onClick={() => scrollByCard(-1)} />
      <GalleryArrow direction={1} disabled={!canScroll.right} onClick={() => scrollByCard(1)} />
    </div>
  );
};

const GalleryArrow = ({
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
      aria-label={direction === 1 ? "Next images" : "Previous images"}
      className={`absolute top-1/2 hidden size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-background/80 backdrop-blur transition-[opacity,border-color] hover:border-primary/60 sm:flex ${
        direction === 1 ? "right-2 lg:right-4" : "left-2 lg:left-4"
      } ${disabled ? "pointer-events-none opacity-0" : "opacity-100"}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon className="size-5" />
    </button>
  );
};

/** Full-screen viewer for a gallery image. Controlled: pass null to close. */
export const Lightbox = ({ image, onClose }: { image: GalleryImage | null; onClose: () => void }) => (
  <Dialog.Root onOpenChange={(open) => !open && onClose()} open={!!image}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm" />
      <Dialog.Content
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-4 outline-none sm:p-8"
        // Close only when the backdrop itself is clicked, not the image or caption.
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <Dialog.Title className="sr-only">
          {image ? `${image.game} ${image.segment} example output` : "Example output"}
        </Dialog.Title>
        {image && (
          <>
            <img
              alt={`${image.game} ${image.segment} example output`}
              className="clip-notch max-h-[80vh] max-w-full border object-contain"
              height={750}
              src={image.src}
              width={1200}
            />
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white/80">
              <span className="font-bold text-white">{image.game}</span>
              <span className="text-primary">✚</span>
              <span>{image.segment}</span>
            </div>
          </>
        )}
        <Dialog.Close asChild>
          <button
            aria-label="Close"
            className="absolute top-4 right-4 cursor-pointer rounded p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            type="button"
          >
            <XIcon className="size-6" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
