import { useEffect, useRef } from "react";

type Pt = { x: number; y: number; vx: number; vy: number; r: number };

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const N = 72;
    const D = 130;
    const pts: Pt[] = [];
    let raf = 0;

    const sz = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    const mk = (): Pt => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.2 + 0.6,
    });

    sz();
    for (let i = 0; i < N; i++) pts.push(mk());
    window.addEventListener("resize", sz);

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.fill();

        for (let j = i + 1; j < N; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < D) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(255,255,255," + 0.13 * (1 - d / D) + ")";
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sz);
    };
  }, []);

  return <canvas id="pcvs" ref={ref} aria-hidden />;
}
