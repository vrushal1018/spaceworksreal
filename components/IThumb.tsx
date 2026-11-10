"use client";
// The small i-shaped windows on the home rows: a slow walk down an office corridor, clipped to the Ina i.
import { useEffect, useRef } from "react";
import { office } from "@/lib/canvas/office";
import { I_PATH, IW } from "@/lib/brand";

export default function IThumb({ mode, offset = 0 }: { mode: "design" | "build" | "manage" | "care"; offset?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!, path = new Path2D(I_PATH);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduce) raf = requestAnimationFrame(draw); }, { rootMargin: "100px" });
    function draw(now: number) {
      const r = c.getBoundingClientRect();
      if (r.width) {
        const d = Math.min(devicePixelRatio || 1, 2);
        if (c.width !== Math.round(r.width * d)) { c.width = Math.round(r.width * d); c.height = Math.round(r.height * d); }
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, c.width, c.height);
        const s = c.width / IW;
        ctx.save(); ctx.scale(s, s); ctx.clip(path); ctx.setTransform(1, 0, 0, 1, 0, 0);
        office(ctx, c.width, c.height, reduce ? 0 : now * 1.6 + offset, mode);
        ctx.restore();
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    }
    io.observe(c);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [mode, offset]);
  return <canvas ref={ref} aria-hidden="true"></canvas>;
}
