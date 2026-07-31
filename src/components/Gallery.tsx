import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

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
            <div className="flex items-center gap-2.5 text-sm text-white/70">
              <span className="font-medium text-white">{image.game}</span>
              <span aria-hidden className="size-1 rounded-full bg-white/40" />
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
