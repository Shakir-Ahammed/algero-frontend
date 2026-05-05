import { useEffect, useCallback, useRef } from "react";
import { env } from "../lib/env";

/**
 * Google reCAPTCHA v3 hook.
 *
 * reCAPTCHA v3 is invisible — no checkbox widget is shown.
 * It scores user behaviour in the background and returns a token
 * when `executeRecaptcha(action)` is called.
 */

// Module-level state: load the script exactly once
let scriptLoaded = false;
let scriptLoading = false;
const pendingCallbacks: (() => void)[] = [];

function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (scriptLoaded) return Promise.resolve();

  return new Promise((resolve) => {
    if (scriptLoading) {
      pendingCallbacks.push(resolve);
      return;
    }

    scriptLoading = true;
    pendingCallbacks.push(resolve);

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;

    script.onload = () => {
      // grecaptcha.ready fires once the library is fully initialised
      window.grecaptcha?.ready(() => {
        scriptLoaded = true;
        scriptLoading = false;
        pendingCallbacks.forEach((cb) => cb());
        pendingCallbacks.length = 0;
      });
    };

    document.head.appendChild(script);
  });
}

export function useRecaptcha() {
  const siteKey = env.RECAPTCHA_SITE_KEY;
  const readyRef = useRef(false);

  // Load the v3 script once
  useEffect(() => {
    if (!siteKey) return;
    loadRecaptchaScript(siteKey).then(() => {
      readyRef.current = true;
    });
  }, [siteKey]);

  /**
   * Execute reCAPTCHA v3 and return a token.
   * @param action  A label for this user action (e.g. "contact", "subscribe").
   */
  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      if (!siteKey) return null;

      // Make sure script is loaded
      if (!readyRef.current) {
        await loadRecaptchaScript(siteKey);
        readyRef.current = true;
      }

      try {
        const token = await window.grecaptcha!.execute(siteKey, { action });
        return token;
      } catch (err) {
        console.error("reCAPTCHA execute failed:", err);
        return null;
      }
    },
    [siteKey]
  );

  return { executeRecaptcha, siteKey };
}
