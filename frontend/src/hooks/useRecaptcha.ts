import { useEffect, useRef, useCallback, useState } from "react";
import { env } from "../lib/env";

/**
 * Google reCAPTCHA v2 checkbox hook.
 *
 * Loads the reCAPTCHA script once globally, renders a widget in the given
 * container ref, and exposes the current token + reset helper.
 *
 * Supports multiple concurrent widget instances (e.g. Contact form +
 * Footer subscription form on the same page).
 */

// Module-level state so the script is loaded exactly once
let scriptLoaded = false;
let scriptLoading = false;
const pendingCallbacks: (() => void)[] = [];

function loadRecaptchaScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();

  return new Promise((resolve) => {
    if (scriptLoading) {
      pendingCallbacks.push(resolve);
      return;
    }

    scriptLoading = true;
    pendingCallbacks.push(resolve);

    // Global callback invoked by the reCAPTCHA script
    (window as Record<string, unknown>).__recaptchaOnLoad = () => {
      scriptLoaded = true;
      scriptLoading = false;
      pendingCallbacks.forEach((cb) => cb());
      pendingCallbacks.length = 0;
    };

    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?onload=__recaptchaOnLoad&render=explicit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
}

export function useRecaptcha() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const siteKey = env.RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    let cancelled = false;

    const renderWidget = () => {
      if (
        cancelled ||
        widgetIdRef.current !== null ||
        !containerRef.current ||
        !window.grecaptcha?.render
      )
        return;

      try {
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          theme: "dark",
          callback: (response: string) => {
            if (!cancelled) setToken(response);
          },
          "expired-callback": () => {
            if (!cancelled) setToken(null);
          },
          "error-callback": () => {
            if (!cancelled) setToken(null);
          },
        });
      } catch {
        // Widget may already be rendered in this container — ignore
      }
    };

    loadRecaptchaScript().then(renderWidget);

    return () => {
      cancelled = true;
      widgetIdRef.current = null;
    };
  }, [siteKey]);

  const resetRecaptcha = useCallback(() => {
    setToken(null);
    if (widgetIdRef.current !== null && window.grecaptcha?.reset) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
  }, []);

  return { containerRef, token, resetRecaptcha, siteKey };
}
