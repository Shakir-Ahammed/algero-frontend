/**
 * Runtime environment configuration.
 *
 * Priority order:
 *   1. window.__ENV__  (injected by Docker at runtime via env-config.js)
 *   2. import.meta.env (Vite build-time env from .env files)
 *   3. Hardcoded defaults
 *
 * This lets us:
 *   - Use .env files during local `npm run dev`
 *   - Override at Docker runtime without rebuilding the image
 */

declare global {
  interface Window {
    __ENV__?: Record<string, string>;
  }
}

function getEnv(key: string, fallback: string): string {
  // 1. Runtime injection (Docker)
  if (window.__ENV__?.[key]) {
    return window.__ENV__[key];
  }
  // 2. Vite build-time env
  const viteVal = import.meta.env[key];
  if (viteVal) {
    return viteVal as string;
  }
  // 3. Default
  return fallback;
}

export const env = {
  API_URL: getEnv("VITE_API_URL", "http://localhost:8000"),
};
