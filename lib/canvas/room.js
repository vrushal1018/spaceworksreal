// The home-page walkthrough: a proportioned 3D office (metres), drawn on a 2D canvas with painter's sort.
// Plain JS on purpose: it is hot drawing code, typed loosely. Used by components/Hero.tsx.
/* eslint-disable */
let FONT = "Poppins, Arial, sans-serif";
/** Canvas text needs the real font-family name that next/font generated. */
export function setFont(family) { FONT = family; }

/* ---------- the walkthrough: a proportioned 3D office, drawn to real sizes (metres) ---------- */
const Room = (() => {
  const C = {
    floor: [201, 191, 176], ceil: [242, 239, 233], wall: [236, 232, 225], blue: [36, 149, 211],
    desk: [246, 243, 238], panel: [156, 147, 135], screen: [38, 42, 46], divider: [160, 182, 196],
    chair: [56, 61, 66], seat: [70, 78, 86], sofa: [186, 176, 162], sofa2: [168, 157, 143], wood: [170, 134, 98],
    plant: [92, 124, 90], pot: [214, 208, 199], rug: [222, 214, 202], glass: [176, 208, 226], mullion: [120, 130, 138],
    white: [255, 255, 255], light: [255, 252, 240], table: [236, 232, 226]
  };
  const shell = [], objs = [];
  const RW = 4.8, RD = 15, RH = 3.0;          // room: 9.6 m wide, 15 m deep, 3 m clear height; 1.6 m central aisle at x 0.2 to 1.8
  const poly = (list, pts, col, o = {}) => list.push({ pts, col, ...o });
  // axis-aligned box as faces (no bottom face)
  function box(x0, y0, z0, x1, y1, z1, col, o = {}) {
    const f = (p, n) => poly(objs, p, col, { n, ...o });
    f([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], [0, 1, 0]);
    f([[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]], [0, 0, -1]);
    f([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], [0, 0, 1]);
    f([[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], [-1, 0, 0]);
    f([[x1, y0, z0], [x1, y0, z1], [x1, y1, z1], [x1, y1, z0]], [1, 0, 0]);
  }
  // n-gon prism (round tables, plants, pendants)
  function prism(cx, cz, r, y0, y1, col, n = 10, o = {}) {
    const ring = y => Array.from({ length: n }, (_, i) => [cx + r * Math.cos(i / n * 2 * Math.PI), y, cz + r * Math.sin(i / n * 2 * Math.PI)]);
    const top = ring(y1), bot = ring(y0);
    poly(objs, top, col, { n: [0, 1, 0], ...o });
    for (let i = 0; i < n; i++) { const j = (i + 1) % n; const a = (i + .5) / n * 2 * Math.PI;
      poly(objs, [bot[i], bot[j], top[j], top[i]], col, { n: [Math.cos(a), 0, Math.sin(a)], ...o }); }
  }
  // ---- shell
  poly(shell, [[-RW, 0, 0], [RW, 0, 0], [RW, 0, RD], [-RW, 0, RD]], C.floor, { n: [0, 1, 0] });
  poly(shell, [[-RW, RH, 0], [RW, RH, 0], [RW, RH, RD], [-RW, RH, RD]], C.ceil, { n: [0, -1, 0] });
  poly(shell, [[RW, 0, 0], [RW, 0, RD], [RW, RH, RD], [RW, RH, 0]], C.wall, { n: [-1, 0, 0] });
  poly(shell, [[-RW, 0, 0], [-RW, 0, RD], [-RW, RH, RD], [-RW, RH, 0]], C.wall, { n: [1, 0, 0] });
  poly(shell, [[-RW, 0, RD], [RW, 0, RD], [RW, RH, RD], [-RW, RH, RD]], C.blue, { n: [0, 0, -1], flat: true });
  // daylight window band on the right wall
  for (let z = 1; z < 13; z += 2.2) poly(shell, [[RW - .01, 1.0, z], [RW - .01, 1.0, z + 1.8], [RW - .01, 2.6, z + 1.8], [RW - .01, 2.6, z]], [250, 252, 255], { flat: true });
  // linear ceiling lights
  for (let z = 0.8; z < 14; z += 1.8) for (const x of [-1.2, 1.0, 3.2]) poly(shell, [[x - .05, RH - .01, z], [x + .05, RH - .01, z], [x + .05, RH - .01, z + 1.2], [x - .05, RH - .01, z + 1.2]], C.light, { flat: true });
  // the Ina "i" on the far blue wall (1.6 m tall), stem polygon + dot
  const IS = 1.6 / 69.37, IX = -2.6, IY = 2.45;
  const iPt = (u, v) => [IX + (u - 22.2) * IS, IY - v * IS, RD - .01];
  poly(shell, [[23.5, 15.35], [0, 15.35], [.49, 15.76], [27.2, 38.98], [27.2, 69.37], [43.53, 69.37], [43.53, 31.9]].map(p => iPt(...p)), C.white, { flat: true });
  poly(shell, Array.from({ length: 16 }, (_, i) => iPt(35.34 + 9.07 * Math.cos(i / 16 * 2 * Math.PI), 9.07 + 9.07 * Math.sin(i / 16 * 2 * Math.PI))), C.white, { flat: true });

  // ---- glass meeting room on the left (x -4.8 to -3.0, z 1.2 to 6.2)
  const gx = -3.0;
  poly(objs, [[gx, 0, 1.2], [gx, 0, 6.2], [gx, RH, 6.2], [gx, RH, 1.2]], C.glass, { n: [1, 0, 0], alpha: .32 });
  for (let z = 1.2; z <= 6.21; z += 1.25) box(gx - .02, 0, z - .02, gx + .02, RH, z + .02, C.mullion);
  box(-4.4, .72, 2.4, -3.5, .75, 5.0, C.table); box(-4.05, 0, 3.4, -3.85, .72, 4.0, C.panel);
  for (const z of [2.7, 3.5, 4.3]) for (const x of [-4.62, -3.28]) { box(x - .22, .44, z - .22, x + .22, .5, z + .22, C.seat); }

  // ---- modular workstations: 4-seater benching, 1200 x 600 desks, 750 mm top, central divider
  function cluster(cx, cz) {
    const w = 1.2, d = .6, top = .75;
    box(cx, top - .03, cz, cx + 2 * w, top, cz + 2 * d, C.desk);                       // continuous top
    for (const x of [cx, cx + w - .02, cx + 2 * w - .04]) box(x, 0, cz + .05, x + .04, top - .03, cz + 2 * d - .05, C.panel); // leg panels
    box(cx, top, cz + d - .015, cx + 2 * w, top + .38, cz + d + .015, C.divider);      // fabric divider
    for (let i = 0; i < 2; i++) for (const side of [0, 1]) {
      const x = cx + i * w + w / 2, zf = side ? cz + d + .2 : cz + d - .22;
      box(x - .28, top + .1, zf - .01, x + .28, top + .43, zf + .01, C.screen);       // 24" monitor
      box(x - .03, top, zf - .03, x + .03, top + .1, zf + .03, C.panel);
      const zc = side ? cz + 2 * d + .38 : cz - .38, back = side ? zc + .2 : zc - .2;     // task chair
      box(x - .24, .44, zc - .23, x + .24, .5, zc + .23, C.seat);
      box(x - .23, .52, back - .03, x + .23, 1.02, back + .03, C.chair);
      box(x - .03, 0, zc - .03, x + .03, .44, zc + .03, C.chair);
    }
  }
  for (const z of [2.2, 4.8, 7.4]) cluster(-2.2, z);
  for (const z of [2.2, 4.8, 7.4]) cluster(1.8, z);

  // ---- collaboration zone at the far end
  poly(objs, [[-1.6, .004, 10.2], [3.2, .004, 10.2], [3.2, .004, 13.6], [-1.6, .004, 13.6]], C.rug, { n: [0, 1, 0], ground: true });
  box(-.8, 0, 13.0, 2.4, .42, 13.85, C.sofa); box(-.8, .42, 13.6, 2.4, .9, 13.85, C.sofa2);
  box(-1.05, 0, 13.0, -.8, .62, 13.85, C.sofa2); box(2.4, 0, 13.0, 2.65, .62, 13.85, C.sofa2);
  prism(.8, 11.9, .5, 0, .38, C.wood, 14);
  for (const x of [-.4, 2.0]) { box(x - .4, 0, 10.4, x + .4, .42, 11.1, C.sofa); box(x - .4, .42, 10.35, x + .4, .82, 10.5, C.sofa2); }
  box(3.5, 1.02, 10.4, 4.6, 1.06, 12.6, C.table); box(4.01, 0, 11.3, 4.09, 1.02, 11.7, C.panel);   // high table
  for (const z of [10.8, 11.6, 12.3]) prism(3.25, z, .18, 0, .72, C.chair, 8);
  for (const [x, z] of [[-4.3, 13.4], [4.3, 9.4], [-4.3, 9.2]]) { prism(x, z, .28, 0, .45, C.pot, 10); prism(x, z, .42, .45, 1.45, C.plant, 9); }
  for (const x of [.3, 1.3]) prism(x, 11.9, .16, 2.05, 2.25, C.light, 10, { flat: true });     // pendants

  // ---- projection, near-plane clipping, shading
  const NEAR = .12, L = [.35, .85, -.4];
  const ln = Math.hypot(...L); L[0] /= ln; L[1] /= ln; L[2] /= ln;
  function render(ctx, w, h, t, ox, oy, f) {
    const per = 26000, u = (t % per) / per;
    // a slow glide just under the ceiling, looking down across the floor like an architect's walkthrough
    const cam = { x: 1.55 + .4 * Math.sin(u * 2 * Math.PI), y: 2.72, z: -.8 + 5.2 * (.5 - .5 * Math.cos(u * 2 * Math.PI)),
                  yaw: .22 * Math.sin(u * 2 * Math.PI * 1.5), pitch: -.52 };
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const view = ([x, y, z]) => { const dx = x - cam.x, dy = y - cam.y, dz = z - cam.z;
      const x1 = cy * dx - sy * dz, z1 = sy * dx + cy * dz; return [x1, cp * dy - sp * z1, sp * dy + cp * z1]; };
    const clip = vs => { const out = [];
      for (let i = 0; i < vs.length; i++) { const a = vs[i], b = vs[(i + 1) % vs.length], ai = a[2] >= NEAR, bi = b[2] >= NEAR;
        if (ai) out.push(a);
        if (ai !== bi) { const k = (NEAR - a[2]) / (b[2] - a[2]); out.push([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, NEAR]); } }
      return out; };
    const scr = p => [ox + p[0] * f / p[2], oy - p[1] * f / p[2]];
    const shade = (p, vs) => {
      const depth = vs.reduce((s, v) => s + v[2], 0) / vs.length;
      let k = 1; if (!p.flat && p.n) { const d = p.n[0] * L[0] + p.n[1] * L[1] + p.n[2] * L[2]; k = .78 + .22 * Math.abs(d) + (p.n[1] > .5 ? .06 : 0); }
      const fog = Math.min(depth / 26, .5);
      const c = p.col.map(v => Math.round(Math.min(255, v * k) * (1 - fog) + 246 * fog));
      return { depth, fill: `rgb(${c[0]},${c[1]},${c[2]})` };
    };
    const draw = (p, vs) => {
      const s = vs.map(scr); ctx.beginPath(); ctx.moveTo(...s[0]); for (let i = 1; i < s.length; i++) ctx.lineTo(...s[i]); ctx.closePath();
      ctx.globalAlpha = p.alpha || 1; ctx.fill(); ctx.globalAlpha = 1;
    };
    ctx.save(); ctx.fillStyle = "#F6F3EE"; ctx.fillRect(0, 0, w, h);
    for (const p of shell) { const vs = clip(p.pts.map(view)); if (vs.length < 3) continue; const s = shade(p, vs); ctx.fillStyle = s.fill; draw(p, vs); }
    // floor joints every 600 mm
    ctx.strokeStyle = "rgba(120,108,92,.18)"; ctx.lineWidth = 1;
    for (let x = -RW; x <= RW; x += .6) { const a = clip([view([x, 0, 0]), view([x, 0, RD]), view([x, 0, RD])]); if (a.length >= 2) { ctx.beginPath(); ctx.moveTo(...scr(a[0])); ctx.lineTo(...scr(a[1])); ctx.stroke(); } }
    const list = [];
    for (const p of objs) { const vs = clip(p.pts.map(view)); if (vs.length < 3) continue; const s = shade(p, vs); list.push([p.ground ? 1e3 : s.depth, p, vs, s.fill]); }
    list.sort((a, b) => b[0] - a[0]);
    for (const [, p, vs, fill] of list) { ctx.fillStyle = fill; draw(p, vs); }
    // ---- Ina SpaceWorks overlay: a designer's mark-up in Ina blue
    const tag = (pt3, text, sub) => { const v = view(pt3); if (v[2] < .8 || v[2] > 11) return;
      const a = Math.min(1, (v[2] - .8) / 1.2) * Math.min(1, (11 - v[2]) / 3); const [x, y] = scr(v);
      ctx.globalAlpha = a; ctx.fillStyle = "#2495D3"; ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill();
      ctx.strokeStyle = "#2495D3"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 34); ctx.lineTo(x + 14, y - 34); ctx.stroke();
      ctx.font = `500 15px ${FONT}`; ctx.fillStyle = "#111111"; ctx.fillText(text, x + 20, y - 30);
      if (sub) { ctx.font = `400 12.5px ${FONT}`; ctx.fillStyle = "#3E464F"; ctx.fillText(sub, x + 20, y - 13); }
      ctx.globalAlpha = 1; };
    const dim = (p0, p1, label) => { const a3 = view(p0), b3 = view(p1); if (a3[2] < .8 || b3[2] < .8 || a3[2] > 9) return;
      const a = Math.min(1, (Math.min(a3[2], b3[2]) - .8) / 1.2) * Math.min(1, (9 - a3[2]) / 2.5);
      const A = scr(a3), B = scr(b3); ctx.globalAlpha = a; ctx.strokeStyle = "#2495D3"; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(...A); ctx.lineTo(...B); ctx.stroke();
      for (const P of [A, B]) { ctx.beginPath(); ctx.moveTo(P[0] - 5, P[1] + 5); ctx.lineTo(P[0] + 5, P[1] - 5); ctx.stroke(); }
      ctx.font = `600 13px ${FONT}`; ctx.fillStyle = "#2495D3"; ctx.textAlign = "center";
      ctx.fillText(label, (A[0] + B[0]) / 2, (A[1] + B[1]) / 2 - 8); ctx.textAlign = "start"; ctx.globalAlpha = 1; };
    for (const z of [2.2, 4.8, 7.4]) { dim([1.8, .78, z - .02], [3.0, .78, z - .02], "1200"); dim([1.78, .78, z], [1.78, .78, z + .6], "600"); }
    tag([3.0, 1.2, 4.8 + .6], "Modular workstations", "4-seater benching, 1200 x 600");
    tag([-4.0, 1.2, 3.7], "Meeting room", "6 seats, glass front");
    tag([.8, .5, 11.9], "Collaboration zone", "lounge and huddle");
    tag([4.0, 1.15, 11.4], "Huddle table", "standing height");
    ctx.restore();
  }
  return { render };
})();

export default Room;
