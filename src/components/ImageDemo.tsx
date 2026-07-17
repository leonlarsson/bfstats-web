import { AlertTriangleIcon, ImageIcon, Loader2Icon, LockIcon, SparklesIcon } from "lucide-react";
import { type ReactNode, type SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/components/Gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { buildImageUrl, DEMO_GAMES, friendlyError, getDemoGame } from "@/lib/imageDemo";

// Only Overview is free to preview here — other segments upsell the bot.
const DEMO_SEGMENT = "overview";

type DemoStatus = "idle" | "loading" | "success" | "error";

// Client-side cooldown between generations. Not a security boundary (the API
// enforces its own limits) — just a courtesy guard against casual spam.
const COOLDOWN_SECONDS = 10;

/**
 * Home-page demo: pick a game/segment/platform, enter a username, and preview
 * the exact image the bot would render. Talks to the image API (see IMAGE_API_BASE).
 * `onExpand` opens the rendered image in the shared lightbox.
 */
export const ImageDemo = ({ onExpand }: { onExpand: (image: GalleryImage) => void }) => {
  const [gameKey, setGameKey] = useState(DEMO_GAMES[0].key);
  const game = getDemoGame(gameKey);

  const [segment, setSegment] = useState(game.segments[0].key);
  const [platform, setPlatform] = useState(game.platforms[0].value);
  const [username, setUsername] = useState("");

  const [status, setStatus] = useState<DemoStatus>("idle");
  const [result, setResult] = useState<GalleryImage | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Track the created object URL + any in-flight request so we can clean up.
  const objectUrlRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  // Timestamp guard (checked synchronously in the handler) + its display ticker.
  const cooldownUntilRef = useRef(0);
  const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const revokeCurrent = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  // Start the cooldown: set the timestamp guard and tick the visible countdown.
  const startCooldown = useCallback(() => {
    cooldownUntilRef.current = Date.now() + COOLDOWN_SECONDS * 1000;
    setCooldown(COOLDOWN_SECONDS);
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    cooldownTimerRef.current = setInterval(() => {
      const remaining = Math.ceil((cooldownUntilRef.current - Date.now()) / 1000);
      if (remaining <= 0) {
        if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
        cooldownTimerRef.current = null;
        setCooldown(0);
      } else {
        setCooldown(remaining);
      }
    }, 250);
  }, []);

  // Clean up the object URL / pending request / ticker on unmount.
  useEffect(() => {
    return () => {
      revokeCurrent();
      abortRef.current?.abort();
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, [revokeCurrent]);

  // Changing game may invalidate the selected segment/platform — reset both.
  const handleGameChange = (nextKey: string) => {
    const nextGame = getDemoGame(nextKey);
    setGameKey(nextKey);
    setSegment(nextGame.segments[0].key);
    setPlatform(nextGame.platforms[0].value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    // Deeper guard: block even if something bypasses the disabled button.
    if (status === "loading" || Date.now() < cooldownUntilRef.current) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setErrorMsg("");
    // Cooldown starts the moment we fire — throttles requests regardless of outcome.
    startCooldown();

    try {
      const res = await fetch(buildImageUrl(gameKey, segment, platform, trimmed), { signal: controller.signal });

      if (!res.ok) {
        let code: string | undefined;
        try {
          code = ((await res.json()) as { error?: string }).error;
        } catch {
          // Non-JSON error body — fall through to the generic message.
        }
        setErrorMsg(friendlyError(code));
        setStatus("error");
        return;
      }

      const blob = await res.blob();
      revokeCurrent();
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      const segmentLabel = game.segments.find((s) => s.key === segment)?.label ?? segment;
      setResult({ src: url, game: game.name, segment: segmentLabel });
      setStatus("success");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setErrorMsg("Couldn't reach the image service. Please try again in a moment.");
      setStatus("error");
    }
  };

  return (
    <TooltipProvider>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-8">
        {/* ---- Controls ---- */}
        <form className="panel clip-notch-sm flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
          <Field label="Game">
            <Select value={gameKey} onValueChange={handleGameChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEMO_GAMES.map((g) => (
                  <SelectItem key={g.key} value={g.key}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Segment">
              <Select value={segment} onValueChange={setSegment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {game.segments.map((s) =>
                    s.key === DEMO_SEGMENT ? (
                      <SelectItem key={s.key} value={s.key}>
                        {s.label}
                      </SelectItem>
                    ) : (
                      <Tooltip key={s.key} delayDuration={150}>
                        <TooltipTrigger asChild>
                          {/* pointerEvents override lets the tooltip fire on the disabled item */}
                          <SelectItem
                            className="cursor-not-allowed"
                            disabled
                            style={{ pointerEvents: "auto" }}
                            value={s.key}
                          >
                            <span className="flex items-center gap-1.5">
                              {s.label}
                              <LockIcon className="size-3 opacity-70" />
                            </span>
                          </SelectItem>
                        </TooltipTrigger>
                        <TooltipContent side="right">Add the bot to use this segment</TooltipContent>
                      </Tooltip>
                    ),
                  )}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Platform">
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {game.platforms.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Username">
            <Input
              aria-label="Username"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. MozzyFX"
              spellCheck={false}
              value={username}
            />
          </Field>

          <Button
            className="clip-btn mt-1"
            disabled={status === "loading" || cooldown > 0 || !username.trim()}
            type="submit"
          >
            {status === "loading" ? (
              <>
                <Loader2Icon className="animate-spin" /> Generating…
              </>
            ) : cooldown > 0 ? (
              <>Wait {cooldown}s…</>
            ) : (
              <>
                <SparklesIcon /> Generate image
              </>
            )}
          </Button>

          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
            Live from the bot's image renderer — the same output you'd get in Discord.
          </p>
        </form>

        {/* ---- Preview ---- */}
        <div className="panel clip-notch-sm relative flex aspect-[1200/750] items-center justify-center overflow-hidden bg-muted/30">
          {status === "success" && result ? (
            <button
              aria-label="Expand generated image"
              className="block size-full cursor-zoom-in"
              onClick={() => onExpand(result)}
              type="button"
            >
              <img
                alt={`${result.game} ${result.segment} stats`}
                className="size-full object-contain"
                src={result.src}
              />
            </button>
          ) : status === "loading" ? (
            <PreviewState icon={<Loader2Icon className="size-6 animate-spin text-primary" />} text="Rendering image…" />
          ) : status === "error" ? (
            <PreviewState
              icon={<AlertTriangleIcon className="size-6 text-destructive" />}
              text={errorMsg}
              tone="error"
            />
          ) : (
            <PreviewState
              icon={<ImageIcon className="size-6 text-muted-foreground" />}
              text="Your generated stat card will appear here."
            />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
    {children}
  </div>
);

const PreviewState = ({ icon, text, tone }: { icon: ReactNode; text: string; tone?: "error" }) => (
  <div className="flex max-w-xs flex-col items-center gap-3 px-6 text-center">
    {icon}
    <p className={`text-sm ${tone === "error" ? "text-destructive" : "text-muted-foreground"}`}>{text}</p>
  </div>
);
