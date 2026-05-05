import { useEffect, useRef, useCallback } from "react";

interface ParallaxValues {
  /** Normalized mouse X (-1 to 1), lerped for smoothness */
  x: number;
  /** Normalized mouse Y (-1 to 1), lerped for smoothness */
  y: number;
  /** Raw (un-lerped) normalized mouse X */
  rawX: number;
  /** Raw (un-lerped) normalized mouse Y */
  rawY: number;
  /** Absolute pixel position */
  clientX: number;
  /** Absolute pixel position */
  clientY: number;
}

type Subscriber = (values: ParallaxValues) => void;

/**
 * Tracks mouse position normalized to -1…1, with smooth lerping.
 * Subscribers are called each animation frame for 60fps updates.
 * Designed to be used by SpaceBackground + CursorGlow simultaneously.
 */
export function useParallax(damping = 0.06) {
  const subscribers = useRef<Set<Subscriber>>(new Set());
  const values = useRef<ParallaxValues>({
    x: 0, y: 0,
    rawX: 0, rawY: 0,
    clientX: 0, clientY: 0,
  });
  const rafId = useRef<number>(0);
  const active = useRef(true);

  const subscribe = useCallback((fn: Subscriber) => {
    subscribers.current.add(fn);
    return () => { subscribers.current.delete(fn); };
  }, []);

  useEffect(() => {
    // Skip on touch-only devices
    const isTouchOnly = window.matchMedia("(hover: none)").matches;
    if (isTouchOnly) return;

    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      values.current.rawX = (e.clientX / w) * 2 - 1;
      values.current.rawY = (e.clientY / h) * 2 - 1;
      values.current.clientX = e.clientX;
      values.current.clientY = e.clientY;
    };

    const tick = () => {
      if (!active.current) return;
      const v = values.current;
      // Lerp toward raw values
      v.x += (v.rawX - v.x) * damping;
      v.y += (v.rawY - v.y) * damping;
      // Notify subscribers
      subscribers.current.forEach((fn) => fn(v));
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      active.current = false;
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [damping]);

  return { subscribe, values };
}
