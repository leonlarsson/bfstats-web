import { CheckIcon, CopyIcon } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BotCommandProps = {
  command: string;
  /** "inline" fits inside prose; "chip" is a standalone button with a copy icon. */
  variant?: "inline" | "chip";
  className?: string;
};

/** A bot command, rendered as a click-to-copy chip. Used everywhere a command is shown. */
export const BotCommand = ({ command, variant = "inline", className }: BotCommandProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (permissions/insecure context) — leave the chip as-is.
    }
  };

  return (
    <button
      className={cn(
        "cursor-pointer whitespace-nowrap rounded-sm border bg-muted font-mono font-medium transition-colors hover:border-primary/60",
        variant === "inline" && "px-1.5 py-0.5 text-[0.85em] text-foreground",
        variant === "chip" && "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs",
        copied && "border-primary text-primary",
        className,
      )}
      onClick={copy}
      title={copied ? "Copied!" : `Copy ${command}`}
      type="button"
    >
      {variant === "chip" &&
        (copied ? (
          <CheckIcon className="size-3 text-primary" />
        ) : (
          <CopyIcon className="size-3 text-muted-foreground" />
        ))}
      {command}
    </button>
  );
};
