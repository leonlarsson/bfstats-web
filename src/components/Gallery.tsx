import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

export type GalleryImage = {
  src: string;
  game: string;
  segment: string;
};

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/example_bf6.png", game: "Battlefield 6", segment: "Overview" },
  { src: "/images/example_bf2042.png", game: "Battlefield 2042", segment: "Overview" },
  { src: "/images/example_bf2042w.png", game: "Battlefield 2042", segment: "Weapons" },
  { src: "/images/example_bf2042v.png", game: "Battlefield 2042", segment: "Vehicles" },
  { src: "/images/example_bf2042g.png", game: "Battlefield 2042", segment: "Gadgets" },
  { src: "/images/example_bfv.png", game: "Battlefield V", segment: "Overview" },
  { src: "/images/example_bfvw.png", game: "Battlefield V", segment: "Weapons" },
  { src: "/images/example_bfvv.png", game: "Battlefield V", segment: "Vehicles" },
  { src: "/images/example_bf1.png", game: "Battlefield 1", segment: "Overview" },
  { src: "/images/example_bf1w.png", game: "Battlefield 1", segment: "Weapons" },
  { src: "/images/example_bf1v.png", game: "Battlefield 1", segment: "Vehicles" },
  { src: "/images/example_bfh.png", game: "Battlefield Hardline", segment: "Overview" },
  { src: "/images/example_bf4.png", game: "Battlefield 4", segment: "Overview" },
  { src: "/images/example_bf3.png", game: "Battlefield 3", segment: "Overview" },
  { src: "/images/example_bfbc2.png", game: "Battlefield Bad Company 2", segment: "Overview" },
  { src: "/images/example_bf2.png", game: "Battlefield 2", segment: "Overview" },
];

export const imageForGame = (gameName: string): GalleryImage | undefined =>
  GALLERY_IMAGES.find((image) => image.game === gameName);

/** Horizontal scroll-snap strip of the bot's example outputs. Click opens the lightbox. */
export const GalleryStrip = ({ onSelect }: { onSelect: (image: GalleryImage) => void }) => (
  <div className="relative -mx-4 lg:-mx-8">
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:px-8">
      {GALLERY_IMAGES.map((image) => (
        <button
          className="panel clip-notch-sm group w-[320px] shrink-0 cursor-pointer snap-start text-left transition-colors hover:border-primary/60 sm:w-[420px]"
          key={image.src}
          onClick={() => onSelect(image)}
          type="button"
        >
          <img
            alt={`${image.game} ${image.segment} example output`}
            className="aspect-[1200/750] w-full object-cover"
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
  </div>
);

/** Full-screen viewer for a gallery image. Controlled: pass null to close. */
export const Lightbox = ({ image, onClose }: { image: GalleryImage | null; onClose: () => void }) => (
  <Dialog.Root onOpenChange={(open) => !open && onClose()} open={!!image}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm" />
      <Dialog.Content
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-4 outline-none sm:p-8"
        onClick={onClose}
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
              onClick={(e) => e.stopPropagation()}
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
