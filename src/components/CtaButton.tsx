import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const ctaButtonVariants = cva(
  "clip-btn inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap transition-[opacity,background-color,border-color]",
  {
    variants: {
      variant: {
        primary: "bg-primary font-bold text-primary-foreground hover:opacity-90",
        outline: "border border-input bg-background/60 font-semibold backdrop-blur hover:bg-accent",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

type CtaButtonProps = ComponentProps<"a"> &
  VariantProps<typeof ctaButtonVariants> & {
    /** Render the child element (e.g. a router Link) instead of an anchor. */
    asChild?: boolean;
  };

/** The site's call-to-action button. Renders an anchor unless asChild is set. */
export const CtaButton = ({ asChild, className, variant, size, ...props }: CtaButtonProps) => {
  const Comp = asChild ? Slot : "a";
  return <Comp className={cn(ctaButtonVariants({ variant, size }), className)} {...props} />;
};
