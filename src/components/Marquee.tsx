import { type CSSProperties, type ReactNode, useLayoutEffect, useRef, useState } from "react";

/**
 * Seamless infinite marquee, robust at any viewport width.
 *
 * Measures one copy of the content, renders exactly as many copies as the container
 * needs (cover + one scrolling out), and animates the track by one copy's width at a
 * constant speed (px/s). Re-measures on resize and font load via ResizeObserver.
 */
export const Marquee = ({ children, speed = 55 }: { children: ReactNode; speed?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);
  const [copyWidth, setCopyWidth] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      const width = copyRef.current?.offsetWidth ?? 0;
      if (!containerWidth || !width) return;
      setCopyWidth(width);
      setCopies(Math.ceil(containerWidth / width) + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    if (copyRef.current) observer.observe(copyRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div aria-hidden className="overflow-hidden" ref={containerRef}>
      <div
        className="animate-marquee flex w-max"
        style={
          copyWidth
            ? ({
                "--marquee-shift": `-${copyWidth}px`,
                animationDuration: `${copyWidth / speed}s`,
              } as CSSProperties)
            : undefined
        }
      >
        {Array.from({ length: copies }, (_, i) => (
          <div className="flex shrink-0" key={i} ref={i === 0 ? copyRef : undefined}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};
