"use client";

import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISS_KEY = "tsm-pwa-install-dismissed";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/** Surfaces the native "Add to Home Screen" prompt on supported browsers. */
export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (isStandalone()) return;
    if (localStorage.getItem(DISMISS_KEY)) return;

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () =>
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
    setDeferredPrompt(null);
  };

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") dismiss();
    else setVisible(false);
    setDeferredPrompt(null);
  };

  if (!visible || !deferredPrompt) return null;

  return (
    <div
      role="dialog"
      aria-label="Install TennisStatMan"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-gold/30 bg-navy/95 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-6"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
        <Download size={20} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">
          Install TennisStatMan
        </p>
        <p className="mt-1 text-xs text-muted">
          Add to your home screen for quick access to rankings, PULSE, and your
          watchlist — even with spotty court Wi‑Fi.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => void install()}
            className="rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-gold-light"
          >
            Install
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground"
          >
            Not now
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 rounded-lg p-1 text-muted transition-colors hover:bg-white/5 hover:text-foreground"
        aria-label="Dismiss install prompt"
      >
        <X size={16} />
      </button>
    </div>
  );
}
