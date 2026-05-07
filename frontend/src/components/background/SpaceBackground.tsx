import { useEffect, useRef } from "react";
import marsImg from "../../assets/images/mars.png";
import moonImg from "../../assets/images/moon.png";

const R = (a: number, b: number) => Math.random() * (b - a) + a;
const L = (a: number, b: number, t: number) => a + (b - a) * t;
const TAU = Math.PI * 2;

// Organic drift — 4x faster for visible motion
function drift(t: number, seed: number, amp: number) {
  return Math.sin(t * 0.0004 + seed) * amp * 0.6
    + Math.sin(t * 0.00092 + seed * 2.7) * amp * 0.3
    + Math.sin(t * 0.00188 + seed * 5.1) * amp * 0.1;
}

// Trail point for fading glow behind moving objects
interface Trail { x: number; y: number; age: number; }

interface Star { bx: number; by: number; sz: number; o: number; sp: number; off: number; layer: number; }
interface Body { bx: number; by: number; r: number; rot: number; rs: number; seed: number; amp: number;
  c1: string; c2: string; kind: "planet" | "rock"; verts: number[]; blur: number;
  trail: Trail[]; lastTrailTime: number; }
interface Passer { x: number; y: number; r: number; rot: number; rs: number; vx: number; vy: number;
  verts: number[]; o: number; life: number; max: number; }
interface Streak { x: number; y: number; len: number; ang: number; spd: number; o: number;
  life: number; max: number; }
interface Flash { x: number; y: number; o: number; life: number; max: number; r: number; }

function rockVerts(r: number, n = 0): number[] {
  const count = n || Math.floor(R(6, 10));
  const v: number[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * TAU;
    v.push(Math.cos(a) * r * R(0.5, 1), Math.sin(a) * r * R(0.5, 1));
  }
  return v;
}

function drawRock(ctx: CanvasRenderingContext2D, v: number[]) {
  ctx.beginPath();
  ctx.moveTo(v[0], v[1]);
  for (let i = 2; i < v.length; i += 2) ctx.lineTo(v[i], v[i + 1]);
  ctx.closePath();
}

// Sun lighting: brightness boost based on angle/distance to sun
function sunLight(x: number, y: number, sx: number, sy: number): number {
  const dx = x - sx, dy = y - sy;
  const d = Math.sqrt(dx * dx + dy * dy);
  return Math.max(0, 1 - d / 900) * 0.35;
}

export const SpaceBackground = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(devicePixelRatio || 1, 2);
    const mob = innerWidth < 768;
    const noMo = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = innerWidth, H = innerHeight;

    // Preload planet textures
    const marsImage = new Image(); marsImage.src = marsImg;
    const moonImage = new Image(); moonImage.src = moonImg;
    let marsLoaded = false, moonLoaded = false;
    marsImage.onload = () => { marsLoaded = true; };
    moonImage.onload = () => { moonLoaded = true; };

    const resize = () => {
      W = innerWidth; H = innerHeight;
      c.width = W * dpr; c.height = H * dpr;
      c.style.width = W + "px"; c.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize, { passive: true });

    // Mouse
    const m = { x: 0, y: 0, cx: -999, cy: -999 };
    const onM = (e: MouseEvent) => {
      m.x = (e.clientX / W) * 2 - 1; m.y = (e.clientY / H) * 2 - 1;
      m.cx = e.clientX; m.cy = e.clientY;
    };
    if (!mob) addEventListener("mousemove", onM, { passive: true });

    // Sun
    const sun = { x: W * 0.85, y: H * 0.1 };

    // Stars — 3 depth tiers
    const SC = mob ? 90 : 180;
    const stars: Star[] = [];
    for (let i = 0; i < SC; i++) {
      const ly = i < SC * 0.6 ? 0 : i < SC * 0.88 ? 1 : 2;
      stars.push({ bx: R(0, W), by: R(0, H),
        sz: ly === 0 ? R(0.3, 0.7) : ly === 1 ? R(0.9, 1.6) : R(1.8, 3),
        o: ly === 2 ? R(0.55, 0.95) : R(0.12, 0.5),
        sp: R(0.0008, 0.003), off: R(0, TAU), layer: ly });
    }

    // Celestial bodies — clearly visible
    const PX = [3, 9, 18]; // parallax per layer
    const TRAIL_MAX_AGE = 3000; // glow fades over 3 seconds
    const TRAIL_INTERVAL = 120; // drop a trail point every 120ms
    const bodies: Body[] = [
      // Large planet — Mars (faster curved orbit, bigger amplitude)
      { bx: W * 0.18, by: H * 0.55, r: mob ? 18 : 30, rot: 0, rs: 0.0003,
        seed: 1.3, amp: 80, c1: "#c0442a", c2: "#6b2010", kind: "planet", verts: [], blur: 0,
        trail: [], lastTrailTime: 0 },
      // Medium planet — Moon (different orbit)
      { bx: W * 0.65, by: H * 0.78, r: mob ? 11 : 18, rot: 0, rs: -0.0004,
        seed: 4.7, amp: 55, c1: "#b0b4b8", c2: "#4a4e52", kind: "planet", verts: [], blur: 0,
        trail: [], lastTrailTime: 0 },
      // Large foreground rock — faster drift
      { bx: W * 0.4, by: H * 0.3, r: mob ? 8 : 14, rot: 0, rs: 0.0006,
        seed: 7.2, amp: 45, c1: "#475569", c2: "#0f172a", kind: "rock",
        verts: rockVerts(mob ? 8 : 14), blur: 0,
        trail: [], lastTrailTime: 0 },
      // Small distant rock
      { bx: W * 0.82, by: H * 0.5, r: mob ? 5 : 9, rot: 0, rs: -0.0005,
        seed: 11.4, amp: 30, c1: "#334155", c2: "#0f172a", kind: "rock",
        verts: rockVerts(mob ? 5 : 9), blur: 1,
        trail: [], lastTrailTime: 0 },
    ];

    // Events state
    const passers: Passer[] = [];
    const streaks: Streak[] = [];
    const flashes: Flash[] = [];
    let nextEvt = performance.now() + R(5000, 9000);

    function spawnEvent(now: number) {
      const t = R(0, 3);
      if (t < 1) {
        // Passing rock — faster crossing
        const fromL = R(0, 1) > 0.5;
        const sz = R(4, 10);
        passers.push({
          x: fromL ? -sz * 3 : W + sz * 3,
          y: R(H * 0.15, H * 0.85),
          r: sz, rot: R(0, TAU), rs: R(-0.002, 0.002),
          vx: (fromL ? 1 : -1) * R(0.6, 1.5),
          vy: R(-0.25, 0.25),
          verts: rockVerts(sz), o: 0, life: 0, max: R(4000, 8000),
        });
      } else if (t < 2) {
        // Light streak
        streaks.push({
          x: R(W * 0.15, W), y: R(-20, H * 0.35),
          len: R(120, 250), ang: R(-0.65, -0.25),
          spd: R(2, 4.5), o: 0, life: 0, max: R(1000, 2000),
        });
      } else {
        // Star flash
        flashes.push({
          x: R(60, W - 60), y: R(60, H - 60),
          o: 0, life: 0, max: R(1500, 3000), r: R(3, 7),
        });
      }
      nextEvt = now + R(8000, 13000);
    }

    // Render loop
    let raf = 0, last = performance.now();

    const draw = (now: number) => {
      const dt = now - last; last = now;
      if (dt > 100) { raf = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, W, H);

      const mx = m.x, my = m.y;
      const sunX = sun.x + mx * PX[1];
      const sunY = sun.y + my * PX[1];

      // ── Nebulae (subtle depth fog) ──
      const drawNeb = (bx: number, by: number, rx: number, ry: number, col: string, seed: number) => {
        const nx = bx + (noMo ? 0 : drift(now, seed, 40)) + mx * PX[0];
        const ny = by + (noMo ? 0 : drift(now, seed + 3, 30)) + my * PX[0];
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, Math.max(rx, ry));
        g.addColorStop(0, col); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.beginPath();
        ctx.ellipse(nx, ny, rx, ry, 0, 0, TAU); ctx.fill();
      };
      drawNeb(W * 0.22, H * 0.38, W * 0.3, H * 0.26, "rgba(59,130,246,0.035)", 1.1);
      drawNeb(W * 0.78, H * 0.62, W * 0.25, H * 0.3, "rgba(124,58,237,0.022)", 5.5);

      // ── Stars ──
      for (const s of stars) {
        const p = PX[s.layer];
        const sx = s.bx + mx * p + (noMo ? 0 : drift(now, s.off, 3 * (s.layer + 1)));
        const sy = s.by + my * p + (noMo ? 0 : drift(now, s.off + 50, 2 * (s.layer + 1)));

        const tw = noMo ? s.o : s.o * (0.35 + 0.65 * Math.sin(now * s.sp + s.off));
        const lit = sunLight(sx, sy, sunX, sunY);

        ctx.globalAlpha = Math.min(1, tw + lit * 0.3);
        ctx.fillStyle = s.layer === 2 ? "#dbeafe" : s.layer === 1 ? "#94a3b8" : "#64748b";
        ctx.beginPath(); ctx.arc(sx, sy, s.sz, 0, TAU); ctx.fill();

        // Bright star glow halo
        if (s.layer === 2 && s.sz > 2) {
          const gl = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.sz * 5);
          gl.addColorStop(0, `rgba(191,219,254,${(tw + lit) * 0.18})`);
          gl.addColorStop(1, "transparent");
          ctx.fillStyle = gl; ctx.beginPath();
          ctx.arc(sx, sy, s.sz * 5, 0, TAU); ctx.fill();
        }

        // Cursor wobble (subtle disturbance)
        if (!mob && s.layer >= 1) {
          const ddx = sx - m.cx, ddy = sy - m.cy;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 55 && d > 0) {
            const f = (1 - d / 55) * 0.2;
            ctx.globalAlpha = tw * 0.4;
            ctx.beginPath(); ctx.arc(sx + ddx / d * f * 10, sy + ddy / d * f * 10, s.sz * 0.6, 0, TAU); ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;

      // ── Sun ──
      const pulse = noMo ? 1 : 0.88 + 0.12 * Math.sin(now * 0.001);
      const bR = mob ? 26 : 38;
      const gR = (mob ? 110 : 190) * pulse;

      // Outer corona
      const g1 = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, gR);
      g1.addColorStop(0, "rgba(59,130,246,0.07)");
      g1.addColorStop(0.3, "rgba(59,130,246,0.025)");
      g1.addColorStop(0.65, "rgba(124,58,237,0.008)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1; ctx.beginPath(); ctx.arc(sunX, sunY, gR, 0, TAU); ctx.fill();

      // Inner glow
      const g2 = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, bR * 2.5);
      g2.addColorStop(0, "rgba(96,165,250,0.3)");
      g2.addColorStop(0.5, "rgba(59,130,246,0.08)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(sunX, sunY, bR * 2.5, 0, TAU); ctx.fill();

      // Core
      const g3 = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, bR * pulse);
      g3.addColorStop(0, "rgba(191,219,254,0.5)");
      g3.addColorStop(0.5, "rgba(96,165,250,0.18)");
      g3.addColorStop(1, "rgba(59,130,246,0.04)");
      ctx.fillStyle = g3; ctx.beginPath(); ctx.arc(sunX, sunY, bR * pulse, 0, TAU); ctx.fill();

      // ── Celestial Bodies (planets + rocks) with fading glow trails ──
      for (const b of bodies) {
        // Organic curved motion (now 4x faster)
        const ox = noMo ? 0 : drift(now, b.seed, b.amp);
        const oy = noMo ? 0 : drift(now, b.seed + 20, b.amp * 0.7);
        const bx = b.bx + ox + mx * PX[2];
        const by = b.by + oy + my * PX[2];
        if (!noMo) b.rot += b.rs * dt;

        // Drop trail point every TRAIL_INTERVAL ms
        if (!noMo && now - b.lastTrailTime > TRAIL_INTERVAL) {
          b.trail.push({ x: bx, y: by, age: 0 });
          b.lastTrailTime = now;
        }
        // Age and prune trail points
        for (let ti = b.trail.length - 1; ti >= 0; ti--) {
          b.trail[ti].age += dt;
          if (b.trail[ti].age > TRAIL_MAX_AGE) b.trail.splice(ti, 1);
        }

        // Draw fading glow trail (old positions gradually dim)
        for (const tp of b.trail) {
          const fade = 1 - tp.age / TRAIL_MAX_AGE; // 1 → 0 over 3s
          const trailAlpha = fade * fade * 0.06; // quadratic fade for smooth dimming
          if (trailAlpha < 0.002) continue;
          const trailR = b.r * (1.5 + (1 - fade) * 1.5); // grows as it fades
          const tg = ctx.createRadialGradient(tp.x, tp.y, 0, tp.x, tp.y, trailR);
          const bodyIdx = bodies.indexOf(b);
          const col = b.kind === "planet"
            ? (bodyIdx === 0 ? "180,80,40" : "160,170,190")
            : "100,130,180";
          tg.addColorStop(0, `rgba(${col},${trailAlpha})`);
          tg.addColorStop(1, "transparent");
          ctx.fillStyle = tg; ctx.beginPath();
          ctx.arc(tp.x, tp.y, trailR, 0, TAU); ctx.fill();
        }

        // Sun directional lighting
        const lit = sunLight(bx, by, sunX, sunY);
        const litSide = Math.atan2(by - sunY, bx - sunX);

        if (b.kind === "planet") {
          // Determine which image to use: first planet = Mars, second = Moon
          const bodyIdx = bodies.indexOf(b);
          const img = bodyIdx === 0 ? marsImage : moonImage;
          const loaded = bodyIdx === 0 ? marsLoaded : moonLoaded;
          const glowCol = bodyIdx === 0 ? "180,60,30" : "160,170,190";

          // Atmospheric glow (tinted per planet)
          const ag = ctx.createRadialGradient(bx, by, b.r * 0.8, bx, by, b.r * 3);
          ag.addColorStop(0, `rgba(${glowCol},${0.06 + lit * 0.08})`);
          ag.addColorStop(1, "transparent");
          ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(bx, by, b.r * 3, 0, TAU); ctx.fill();

          if (loaded) {
            // Draw the planet image clipped to a circle
            ctx.save();
            ctx.globalAlpha = 0.9;
            ctx.beginPath(); ctx.arc(bx, by, b.r, 0, TAU); ctx.clip();
            ctx.drawImage(img, bx - b.r, by - b.r, b.r * 2, b.r * 2);

            // Shadow overlay for sun-lit side
            const shg = ctx.createRadialGradient(
              bx - Math.cos(litSide) * b.r * 0.5,
              by - Math.sin(litSide) * b.r * 0.5,
              b.r * 0.2, bx, by, b.r);
            shg.addColorStop(0, "transparent");
            shg.addColorStop(0.6, "rgba(0,0,0,0.15)");
            shg.addColorStop(1, "rgba(0,0,0,0.55)");
            ctx.fillStyle = shg; ctx.beginPath(); ctx.arc(bx, by, b.r, 0, TAU); ctx.fill();

            ctx.restore();
            ctx.globalAlpha = 1;
          } else {
            // Fallback gradient while loading
            const hlx = bx - Math.cos(litSide) * b.r * 0.35;
            const hly = by - Math.sin(litSide) * b.r * 0.35;
            const pg = ctx.createRadialGradient(hlx, hly, 0, bx, by, b.r);
            pg.addColorStop(0, b.c1); pg.addColorStop(0.7, b.c2); pg.addColorStop(1, "#030712");
            ctx.globalAlpha = 0.85;
            ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(bx, by, b.r, 0, TAU); ctx.fill();
            ctx.globalAlpha = 1;
          }
        } else {
          // Rock with rotation and lighting
          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(b.rot);

          // Lit body
          ctx.globalAlpha = 0.6 + lit * 0.2;
          const rbg = ctx.createRadialGradient(
            -Math.cos(litSide - b.rot) * b.r * 0.3,
            -Math.sin(litSide - b.rot) * b.r * 0.3, 0, 0, 0, b.r);
          rbg.addColorStop(0, b.c1); rbg.addColorStop(1, b.c2);
          ctx.fillStyle = rbg;
          drawRock(ctx, b.verts); ctx.fill();

          // Edge highlight
          ctx.strokeStyle = `rgba(148,163,184,${0.1 + lit * 0.1})`;
          ctx.lineWidth = 0.6;
          drawRock(ctx, b.verts); ctx.stroke();

          ctx.restore();
          ctx.globalAlpha = 1;
        }
      }

      // ── Events ──
      if (!noMo && now > nextEvt) spawnEvent(now);

      // Passing rocks
      for (let i = passers.length - 1; i >= 0; i--) {
        const p = passers[i];
        p.life += dt; const pr = p.life / p.max;
        if (pr >= 1) { passers.splice(i, 1); continue; }
        p.o = pr < 0.1 ? pr / 0.1 : pr > 0.7 ? (1 - pr) / 0.3 : 1;
        p.x += p.vx * dt * 0.06;
        p.y += p.vy * dt * 0.06;
        p.rot += p.rs * dt;

        const lit = sunLight(p.x, p.y, sunX, sunY);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = p.o * (0.35 + lit * 0.15);
        const pg = ctx.createRadialGradient(-p.r * 0.2, -p.r * 0.2, 0, 0, 0, p.r);
        pg.addColorStop(0, "#475569"); pg.addColorStop(1, "#0f172a");
        ctx.fillStyle = pg; drawRock(ctx, p.verts); ctx.fill();
        ctx.strokeStyle = `rgba(148,163,184,${0.08 + lit * 0.05})`;
        ctx.lineWidth = 0.5; drawRock(ctx, p.verts); ctx.stroke();
        ctx.restore(); ctx.globalAlpha = 1;
      }

      // Light streaks
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i]; s.life += dt;
        const pr = s.life / s.max;
        if (pr >= 1) { streaks.splice(i, 1); continue; }
        s.o = (pr < 0.12 ? pr / 0.12 : pr > 0.55 ? (1 - pr) / 0.45 : 1) * 0.4;
        s.x += Math.cos(s.ang) * s.spd * dt * 0.06;
        s.y += Math.sin(s.ang) * s.spd * dt * 0.06;
        const ex = s.x + Math.cos(s.ang) * s.len;
        const ey = s.y + Math.sin(s.ang) * s.len;
        const sg = ctx.createLinearGradient(s.x, s.y, ex, ey);
        sg.addColorStop(0, `rgba(191,219,254,${s.o})`);
        sg.addColorStop(0.4, `rgba(96,165,250,${s.o * 0.5})`);
        sg.addColorStop(1, "transparent");
        ctx.strokeStyle = sg; ctx.lineWidth = R(0.6, 1.2); ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(ex, ey); ctx.stroke();
      }

      // Star flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i]; f.life += dt;
        const pr = f.life / f.max;
        if (pr >= 1) { flashes.splice(i, 1); continue; }
        f.o = pr < 0.15 ? pr / 0.15 : (1 - pr) / 0.85;

        // Cross-shaped lens flare
        ctx.globalAlpha = f.o * 0.5;
        const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 7);
        fg.addColorStop(0, "rgba(219,234,254,0.45)");
        fg.addColorStop(0.25, "rgba(147,197,253,0.12)");
        fg.addColorStop(1, "transparent");
        ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 7, 0, TAU); ctx.fill();

        // Bright core
        ctx.fillStyle = "#e0e7ff"; ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * f.o, 0, TAU); ctx.fill();

        // Horizontal spike
        ctx.strokeStyle = `rgba(191,219,254,${f.o * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(f.x - f.r * 4 * f.o, f.y);
        ctx.lineTo(f.x + f.r * 4 * f.o, f.y); ctx.stroke();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onM);
    };
  }, []);

  return (
    <canvas ref={ref} aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", width: "100%", height: "100%" }} />
  );
};
