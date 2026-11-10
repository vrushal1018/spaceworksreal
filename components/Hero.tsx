"use client";
// Home intro: the Ina i flashes, travels across the screen, then settles and opens onto a walkthrough of an office.
// Plays once per visit; afterwards the hero opens settled. "Replay the intro" in the footer plays it again.
import Link from "next/link";
import { useEffect, useRef } from "react";
import Room, { setFont } from "@/lib/canvas/room";
import { I_PATH, IW, IH } from "@/lib/brand";
import { CONTACT } from "@/lib/content";
import { Works } from "./Brand";

const T = { flash: 700, fill: 600, travel: 1300, open: 1200 };   // ms
const TOTAL = T.flash + T.fill + T.travel + T.open;
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null), stageRef = useRef<HTMLCanvasElement>(null), innerRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const hero = heroRef.current!, stage = stageRef.current!, sctx = stage.getContext("2d")!;
    const path = new Path2D(I_PATH);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setFont(getComputedStyle(document.body).fontFamily);
    let W = 0, H = 0, DPR = 1, introStart = 0, introDone = false, raf = 0, settled = false;
    try { settled = sessionStorage.getItem("isw-intro-seen") === "1"; } catch {}

    const size = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = hero.clientWidth; H = hero.clientHeight;
      stage.width = Math.round(W * DPR); stage.height = Math.round(H * DPR);
    };
    const layout = () => {
      if (W >= 860) return { x: W * 0.7, y: H * 0.53, h: H * 0.84 };
      const top = innerRef.current ? innerRef.current.offsetTop : H * 0.55;   // the copy's top inside the hero
      const h = Math.max(150, Math.min(H * 0.5, top - 72 - 48));
      return { x: W * 0.5, y: 72 + (top - 72) / 2, h };                       // centred between the header and the copy
    };
    const frame = (now: number) => {
      if (!introStart) introStart = now;
      const e = reduce || settled ? TOTAL : now - introStart;
      sctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const s0 = Math.min(H * 0.5, W * 0.5) / IH;
      const end = layout(), s1 = end.h / IH;
      const pFlash = clamp(e / T.flash), pFill = clamp((e - T.flash) / T.fill),
            pTravel = clamp((e - T.flash - T.fill) / T.travel), pSettle = clamp((e - T.flash - T.fill - T.travel) / T.open);
      const ps = ease(pSettle), tr = ease(pTravel);
      const dx = -Math.sin(tr * Math.PI * 2) * W * 0.14;
      const x = W / 2 + dx + (end.x - W / 2) * ps, y = H / 2 + (end.y - H / 2) * ps;
      const appear = ease(clamp(pFlash * 1.6));
      const sc = (s0 + (s1 - s0) * ps) * (0.82 + 0.18 * appear);
      const flash = pFlash < 1 ? 0.55 + 0.45 * Math.abs(Math.cos(pFlash * Math.PI * 2.5)) : 1;
      sctx.fillStyle = "#F4F2EE"; sctx.fillRect(0, 0, W, H);
      sctx.save();
      sctx.translate(x, y); sctx.scale(sc, sc); sctx.translate(-IW / 2, -IH / 2);
      sctx.globalAlpha = appear * flash; sctx.fillStyle = "#2495D3"; sctx.fill(path); sctx.globalAlpha = 1;
      if (pFill > 0) {
        sctx.save(); sctx.clip(path);
        sctx.globalAlpha = ease(pFill);
        const m = sctx.getTransform();
        sctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        const rx = (W / 2) * (1 - ps) + (x + 6 * sc) * ps, ry = (H / 2) * (1 - ps) + (y - 4 * sc) * ps;
        Room.render(sctx, W, H, now, rx, ry, Math.max(H * 0.36, sc * IH * 0.5));
        sctx.setTransform(m);
        sctx.restore();
        sctx.globalAlpha = ease(pFill) * 0.9;
        sctx.lineWidth = 0.32; sctx.strokeStyle = "#2495D3"; sctx.stroke(path);
        sctx.globalAlpha = 1;
      }
      sctx.restore();
      if (pSettle >= 1 && !introDone) {
        introDone = true; hero.classList.add("revealed");
        try { sessionStorage.setItem("isw-intro-seen", "1"); } catch {}
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => { cancelAnimationFrame(raf); introStart = 0; introDone = false; hero.classList.remove("revealed"); size(); raf = requestAnimationFrame(frame); };
    const replay = () => { settled = false; start(); };
    skipRef.current = () => { introStart = performance.now() - TOTAL; };
    window.addEventListener("resize", size);
    window.addEventListener("isw:replay", replay);
    start();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); window.removeEventListener("isw:replay", replay); };
  }, []);

  return (
    <div className="hero" id="hero" ref={heroRef}>
      <canvas ref={stageRef} aria-hidden="true"></canvas>
      <div className="copy"><div className="wrap"><div className="inner" ref={innerRef}>
        <p className="eyebrow">Interiors for workplaces and commercial spaces</p>
        <h1>Design leads.<br /><b>Everything else works.</b></h1>
        <div className="services">{["design", "build", "manage", "care"].map(w => <Works key={w} w={w} />)}</div>
        <div className="ctas"><Link className="btn primary" href="/contact">Tell us about your space</Link><a className="btn" href={CONTACT.whatsapp} target="_blank" rel="noopener">WhatsApp us</a></div>
      </div></div></div>
      <button className="skip" onClick={() => skipRef.current()}>Skip intro</button>
    </div>
  );
}
