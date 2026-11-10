// The small i-shaped windows on the home rows: a procedural office corridor, drawn per frame.
/* eslint-disable */
export function office(ctx, w, h, t, mode) {
  const line = mode === "design" || mode === "build" || mode === "manage";
  const pal = {
    ceil: "#ECE8E1", floor0: "#C2B6A4", floor1: "#968873", wall: "#E8E3DB", glass: "rgba(186,214,232,.55)",
    light: "#FFFDF6", desk: "#F6F3EE", deskEdge: "#9C9284", screen: "#2B2F33", accent: "#2495D3", far: "#F8F5EF"
  };
  const ink = mode === "design" ? "#2495D3" : mode === "manage" ? "#878787" : "#111111";
  ctx.save();
  ctx.fillStyle = line ? (mode === "design" ? "#FFFFFF" : "#F4F2EE") : pal.far;
  ctx.fillRect(0, 0, w, h);
  const f = Math.max(w, h * 1.1) * 0.62, camY = 0.46, camX = Math.sin(t * 0.00018) * 0.06;
  const camZ = t * 0.00042;                       // slow walk forward
  const P = (X, Y, Z) => { const z = Math.max(Z - camZ, 0.05); return [w / 2 + (X - camX) * f / z, h * 0.5 - (Y - camY) * f / z]; };
  const quad = (a, b, c, d, fill, stroke) => {
    ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.lineTo(...c); ctx.lineTo(...d); ctx.closePath();
    if (fill && !line) { ctx.fillStyle = fill; ctx.fill(); }
    if (line || stroke) { ctx.strokeStyle = stroke || ink; ctx.lineWidth = line ? Math.max(1, w / 260) : 1; ctx.stroke(); }
  };
  const near = camZ + 0.35, far = camZ + 9;
  // shell
  if (!line) {
    const gF = ctx.createLinearGradient(0, h, 0, h * 0.5); gF.addColorStop(0, pal.floor1); gF.addColorStop(1, pal.floor0);
    quad(P(-1, 0, near), P(1, 0, near), P(1, 0, far), P(-1, 0, far), gF);
    quad(P(-1, 1, near), P(1, 1, near), P(1, 1, far), P(-1, 1, far), pal.ceil);
    quad(P(1, 0, near), P(1, 1, near), P(1, 1, far), P(1, 0, far), pal.wall);
    quad(P(-1, 0, near), P(-1, 1, near), P(-1, 1, far), P(-1, 0, far), "#E3E9EC");
    // far wall: daylight window band over an Ina-blue feature wall
    quad(P(-1, 0, far), P(1, 0, far), P(1, 1, far), P(-1, 1, far), pal.far);
    quad(P(-1, 0.42, far), P(1, 0.42, far), P(1, 0.92, far), P(-1, 0.92, far), "#FFFFFF");
    quad(P(-0.34, 0, far - 0.01), P(0.34, 0, far - 0.01), P(0.34, 0.4, far - 0.01), P(-0.34, 0.4, far - 0.01), pal.accent);
  } else {
    quad(P(-1, 0, far), P(1, 0, far), P(1, 1, far), P(-1, 1, far));
    for (const X of [-1, 1]) { ctx.beginPath(); ctx.moveTo(...P(X, 0, near)); ctx.lineTo(...P(X, 0, far)); ctx.moveTo(...P(X, 1, near)); ctx.lineTo(...P(X, 1, far)); ctx.stroke(); }
  }
  // repeating elements, far to near
  const items = [];
  const rep = (step, fn) => { const k0 = Math.floor(near / step); for (let k = k0 + Math.ceil((far - near) / step); k >= k0; k--) items.push([k * step, fn]); };
  rep(0.95, z => {   // linear ceiling lights
    for (const X of [-0.45, 0.45]) quad(P(X - 0.035, 0.995, z), P(X + 0.035, 0.995, z), P(X + 0.035, 0.995, z + 0.55), P(X - 0.035, 0.995, z + 0.55), pal.light, line ? null : null);
  });
  rep(0.8, z => {    // glass meeting rooms on the left: mullions
    const a = P(-1, 0, z), b = P(-1, 1, z);
    ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.strokeStyle = line ? ink : "#8FA3B0"; ctx.lineWidth = Math.max(1, w / 400); ctx.stroke();
    if (!line) quad(P(-1, 0.04, z), P(-1, 0.96, z), P(-1, 0.96, z + 0.8), P(-1, 0.04, z + 0.8), pal.glass);
  });
  rep(0.3, z => {    // timber slats on the right wall
    if (line) return;
    ctx.beginPath(); ctx.moveTo(...P(0.999, 0.04, z)); ctx.lineTo(...P(0.999, 0.96, z));
    ctx.strokeStyle = "#D6CDBF"; ctx.lineWidth = Math.max(1, w / 500); ctx.stroke();
  });
  rep(1.25, z => {   // desks: a thin top on two legs, a screen, a chair
    const x0 = 0.4, x1 = 0.86, top = 0.36, d = 0.42, t2 = 0.025;
    for (const X of [x0 + 0.02, x1 - 0.02]) quad(P(X - 0.01, 0, z + 0.04), P(X + 0.01, 0, z + 0.04), P(X + 0.01, top, z + 0.04), P(X - 0.01, top, z + 0.04), pal.deskEdge);
    quad(P(x0, top - t2, z), P(x1, top - t2, z), P(x1, top, z), P(x0, top, z), pal.deskEdge);
    quad(P(x0, top, z), P(x1, top, z), P(x1, top, z + d), P(x0, top, z + d), pal.desk);
    quad(P(0.56, top, z + 0.3), P(0.7, top, z + 0.3), P(0.7, 0.5, z + 0.3), P(0.56, 0.5, z + 0.3), pal.screen);
    quad(P(0.55, 0.22, z - 0.12), P(0.71, 0.22, z - 0.12), P(0.71, 0.44, z - 0.12), P(0.55, 0.44, z - 0.12), "#3A3F44");
  });
  if (mode === "manage") rep(1.25, z => {   // schedule bars along the aisle
    quad(P(-0.2, 0.002, z), P(0.1, 0.002, z), P(0.1, 0.002, z + 0.55), P(-0.2, 0.002, z + 0.55), null, "#2495D3");
  });
  items.sort((a, b) => b[0] - a[0]).forEach(([z, fn]) => { if (z + 1 > near && z < far) fn(z); });
  // depth haze
  if (!line) { const g = ctx.createRadialGradient(w / 2, h * 0.5, 0, w / 2, h * 0.5, Math.max(w, h) * 0.7); g.addColorStop(0, "rgba(255,253,246,.35)"); g.addColorStop(.3, "rgba(255,253,246,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }
  if (mode === "care") { ctx.fillStyle = "rgba(36,149,211,.18)"; ctx.fillRect(0, 0, w, h); }
  ctx.restore();
}
