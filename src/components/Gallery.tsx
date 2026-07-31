import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

export type GalleryImage = {
  src: string;
  game: string;
  segment: string;
};

/**
 * Real unedited bot output, one entry per rendered card. Grouped by game in the order
 * the game tabs use, and within a game: Overview first, since it leads the row.
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/examples/bf6-overview.webp", game: "Battlefield 6", segment: "Overview" },
  { src: "/images/examples/bf6-weapons.webp", game: "Battlefield 6", segment: "Weapons" },
  { src: "/images/examples/bf6-vehicles.webp", game: "Battlefield 6", segment: "Vehicles" },

  { src: "/images/examples/bf2042-overview.webp", game: "Battlefield 2042", segment: "Overview" },
  { src: "/images/examples/bf2042-weapons.webp", game: "Battlefield 2042", segment: "Weapons" },
  { src: "/images/examples/bf2042-vehicles.webp", game: "Battlefield 2042", segment: "Vehicles" },

  { src: "/images/examples/bfv-overview.webp", game: "Battlefield V", segment: "Overview" },
  { src: "/images/examples/bfv-weapons.webp", game: "Battlefield V", segment: "Weapons" },
  { src: "/images/examples/bfv-vehicles.webp", game: "Battlefield V", segment: "Vehicles" },

  { src: "/images/examples/bf1-overview.webp", game: "Battlefield 1", segment: "Overview" },
  { src: "/images/examples/bf1-weapons.webp", game: "Battlefield 1", segment: "Weapons" },
  { src: "/images/examples/bf1-vehicles.webp", game: "Battlefield 1", segment: "Vehicles" },

  { src: "/images/examples/bfh-overview.webp", game: "Battlefield Hardline", segment: "Overview" },
  { src: "/images/examples/bfh-vehicles.webp", game: "Battlefield Hardline", segment: "Vehicles" },

  { src: "/images/examples/bf4-overview.webp", game: "Battlefield 4", segment: "Overview" },
  { src: "/images/examples/bf4-weapons.webp", game: "Battlefield 4", segment: "Weapons" },
  { src: "/images/examples/bf4-vehicles.webp", game: "Battlefield 4", segment: "Vehicles" },

  { src: "/images/examples/bf3-overview.webp", game: "Battlefield 3", segment: "Overview" },
  { src: "/images/examples/bf3-weapons.webp", game: "Battlefield 3", segment: "Weapons" },
  { src: "/images/examples/bf3-vehicles.webp", game: "Battlefield 3", segment: "Vehicles" },

  { src: "/images/examples/bf2-overview.webp", game: "Battlefield 2", segment: "Overview" },
  { src: "/images/examples/bf2-weapons.webp", game: "Battlefield 2", segment: "Weapons" },
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
