import { useEffect, useRef } from "react";

/* ================================================================
   CursorGlow — Custom cursor with soft radial glow
   ================================================================
   - Smooth lerped following (not snapping)
   - Magnetic pull toward [data-magnetic] elements
   - Desktop-only (hidden on touch devices)
   - Separate from the space canvas to avoid z-index conflicts
   ================================================================ */

const GLOW_RADIUS = 120;
const GLOW_COLOR = "rgba(59,130,246,0.12)";
const LERP_SPEED = 0.1;
const MAGNETIC_RADIUS = 120; // detect range in px
const MAGNETIC_STRENGTH = 0.35;

export const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });
  const rafId = useRef(0);
  const isHovering = useRef(false);

  useEffect(() => {
    // Skip on touch devices
    const isTouchOnly = window.matchMedia("(hover: none)").matches;
    if (isTouchOnly) return;

    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;

    const handleMove = (e: MouseEvent) => {
      let tx = e.clientX;
      let ty = e.clientY;

      // Magnetic pull toward nearest [data-magnetic] element
      const magnetics = document.querySelectorAll<HTMLElement>("[data-magnetic]");
      let pulled = false;

      for (const el of magnetics) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = tx - cx;
        const dy = ty - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = Math.max(rect.width, rect.height) / 2 + MAGNETIC_RADIUS;

        if (dist < threshold) {
          const strength = (1 - dist / threshold) * MAGNETIC_STRENGTH;
          tx -= dx * strength;
          ty -= dy * strength;
          pulled = true;
          break;
        }
      }

      target.current.x = tx;
      target.current.y = ty;
      isHovering.current = pulled;
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * LERP_SPEED;
      pos.current.y += (target.current.y - pos.current.y) * LERP_SPEED;

      const x = pos.current.x;
      const y = pos.current.y;

      glow.style.transform = `translate(${x - GLOW_RADIUS}px, ${y - GLOW_RADIUS}px)`;
      dot.style.transform = `translate(${x - 4}px, ${y - 4}px) scale(${isHovering.current ? 2.5 : 1})`;

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      {/* Soft glow circle */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: GLOW_RADIUS * 2,
          height: GLOW_RADIUS * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GLOW_COLOR}, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 9997,
          willChange: "transform",
          transition: "opacity 0.3s ease",
          mixBlendMode: "screen",
        }}
      />
      {/* Tiny cursor dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "rgba(147,197,253,0.6)",
          boxShadow: "0 0 12px 3px rgba(59,130,246,0.3)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "transform 0.15s ease, background 0.2s ease",
        }}
      />
    </>
  );
};
