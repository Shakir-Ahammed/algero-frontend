/// <reference types="vite/client" />

interface RecaptchaRenderOptions {
  sitekey: string;
  theme?: "light" | "dark";
  size?: "compact" | "normal" | "invisible";
  callback?: (response: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
}

interface Grecaptcha {
  render: (container: HTMLElement, options: RecaptchaRenderOptions) => number;
  reset: (widgetId?: number) => void;
  getResponse: (widgetId?: number) => string;
}

interface Window {
  grecaptcha?: Grecaptcha;
}
