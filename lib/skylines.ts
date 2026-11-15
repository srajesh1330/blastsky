export type CityId = "generic" | "sydney" | "london" | "newyork" | "toronto" | "auckland" | "paris";

export const CITIES: { id: CityId; name: string }[] = [
  { id: "generic", name: "Generic skyline" },
  { id: "sydney", name: "Sydney" },
  { id: "london", name: "London" },
  { id: "newyork", name: "New York" },
  { id: "toronto", name: "Toronto" },
  { id: "auckland", name: "Auckland" },
  { id: "paris", name: "Paris" },
];

function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Pen {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  u: number; // size unit: landmarks scale with this
  color: string;
  lit: boolean;
  r: () => number;
}

function windows(p: Pen, x: number, top: number, bw: number, density: number) {
  if (!p.lit) return;
  const { ctx, h, r } = p;
  for (let wy = top + 8; wy < h - 6; wy += 11) {
    for (let wx = x + 5; wx < x + bw - 6; wx += 9) {
      if (r() < density) {
        ctx.fillStyle = `rgba(255,205,120,${0.3 + r() * 0.5})`;
        ctx.fillRect(wx, wy, 3, 4);
      }
    }
  }
}

/** Ordinary buildings that fill the gaps. Heights stay low inside the "clear" ranges. */
function filler(p: Pen, minH: number, maxH: number, clear: [number, number][], density: number) {
  const { ctx, w, h, u, r } = p;
  let x = -10;
  while (x < w) {
    const bw = 26 + r() * 54;
    const free = clear.some(([a, b]) => x + bw > a && x < b);
    const bh = u * (free ? 0.02 + r() * 0.025 : minH + r() * (maxH - minH));
    ctx.fillStyle = p.color;
    ctx.fillRect(x, h - bh, bw, bh + 2);
    windows(p, x, h - bh, bw, density);
    x += bw + r() * 3;
  }
  ctx.fillStyle = p.color;
  ctx.fillRect(0, h - u * 0.02, w, u * 0.02 + 2);
}

function poly(ctx: CanvasRenderingContext2D, cx: number, y0: number, pts: number[][], sx: number, sy: number) {
  ctx.beginPath();
  pts.forEach(([px, py], i) => (i ? ctx.lineTo(cx + px * sx, y0 + py * sy) : ctx.moveTo(cx + px * sx, y0 + py * sy)));
  ctx.closePath();
}

function eiffel(p: Pen, cx: number) {
  const { ctx, h, u } = p;
  const bw = 0.135 * u;
  const H = 0.36 * u;
  const y0 = h;
  const half = [[1, 0], [0.62, -0.28], [0.36, -0.55], [0.2, -0.8], [0.06, -0.93], [0, -1]];
  const pts = [...half.map(([x, y]) => [-x, y]), ...half.slice(0, -1).reverse().map(([x, y]) => [x, y])];
  ctx.fillStyle = p.color;
  poly(ctx, cx, y0, pts, bw, H);
  const rx = 0.5 * bw;
  const ry = 0.2 * H;
  ctx.moveTo(cx - rx, y0);
  ctx.ellipse(cx, y0, rx, ry, 0, Math.PI, 2 * Math.PI);
  ctx.closePath();
  ctx.fill("evenodd");
  ctx.fillRect(cx - bw * 0.64, y0 - 0.285 * H, bw * 1.28, H * 0.03);
  ctx.fillRect(cx - bw * 0.37, y0 - 0.56 * H, bw * 0.74, H * 0.025);
  ctx.fillRect(cx - bw * 0.04, y0 - H * 1.08, bw * 0.08, H * 0.1);
}

function bigBen(p: Pen, cx: number) {
  const { ctx, h, u } = p;
  ctx.fillStyle = p.color;
  const tw = 0.058 * u;
  ctx.fillRect(cx - tw / 2, h - 0.2 * u, tw, 0.2 * u);
  ctx.fillRect(cx - tw * 0.6, h - 0.245 * u, tw * 1.2, 0.05 * u);
  poly(ctx, cx, h - 0.245 * u, [[-0.62, 0], [0, -1], [0.62, 0]], tw, 0.07 * u);
  ctx.fill();
  ctx.fillRect(cx - 1, h - 0.34 * u, 2, 0.04 * u);
  if (p.lit) {
    ctx.fillStyle = "rgba(255,215,140,0.95)";
    ctx.beginPath();
    ctx.arc(cx, h - 0.17 * u, 0.012 * u, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = p.color;
  ctx.fillRect(cx + tw * 0.5, h - 0.075 * u, 0.3 * u, 0.075 * u);
  for (const dx of [0.07, 0.17, 0.27]) {
    poly(ctx, cx + dx * u + tw * 0.5, h - 0.075 * u, [[-0.012, 0], [0, -0.04], [0.012, 0]], u, u);
    ctx.fill();
  }
}

function londonEye(p: Pen, cx: number) {
  const { ctx, h, u } = p;
  const R = 0.12 * u;
  const cy = h - R - 0.02 * u;
  ctx.strokeStyle = p.color;
  ctx.lineWidth = Math.max(2, 0.005 * u);
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, R * 0.93, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = Math.max(1, 0.002 * u);
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
  }
  ctx.stroke();
  ctx.lineWidth = Math.max(2, 0.006 * u);
  ctx.beginPath();
  ctx.moveTo(cx - 0.04 * u, h);
  ctx.lineTo(cx, cy);
  ctx.lineTo(cx + 0.04 * u, h);
  ctx.stroke();
  ctx.fillStyle = p.color;
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * R, cy + Math.sin(a) * R, Math.max(1.5, 0.004 * u), 0, Math.PI * 2);
    ctx.fill();
  }
}

function shard(p: Pen, cx: number) {
  const { ctx, h, u } = p;
  ctx.fillStyle = p.color;
  poly(ctx, cx, h, [[-1, 0], [-0.62, -0.66], [0, -1], [0.62, -0.66], [1, 0]], 0.035 * u, 0.3 * u);
  ctx.fill();
}

function empireState(p: Pen, cx: number) {
  const { ctx, h, u } = p;
  ctx.fillStyle = p.color;
  const steps: [number, number][] = [[0.09, 0.12], [0.062, 0.2], [0.042, 0.245], [0.024, 0.275]];
  steps.forEach(([bw, bh]) => ctx.fillRect(cx - (bw * u) / 2, h - bh * u, bw * u, bh * u));
  poly(ctx, cx, h - 0.275 * u, [[-1, 0], [0, -1], [1, 0]], 0.007 * u, 0.075 * u);
  ctx.fill();
}

function oneWTC(p: Pen, cx: number) {
  const { ctx, h, u } = p;
  ctx.fillStyle = p.color;
  poly(ctx, cx, h, [[-1, 0], [-0.9, -0.84], [0, -1], [0.9, -0.84], [1, 0]], 0.03 * u, 0.3 * u);
  ctx.fill();
  ctx.fillRect(cx - 1, h - 0.4 * u, 2, 0.11 * u);
}

function tower(p: Pen, cx: number, height: number, shaft: number, podAt: number, podW: number, podH: number) {
  const { ctx, h, u } = p;
  ctx.fillStyle = p.color;
  poly(ctx, cx, h, [[-1, 0], [-0.55, -1], [0.55, -1], [1, 0]], shaft * u, height * u);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx, h - podAt * u, podW * u, podH * u, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(cx - podW * u * 0.55, h - (podAt - podH * 1.1) * u, podW * u * 1.1, podH * 0.5 * u);
  poly(ctx, cx, h - height * u, [[-1, 0], [0, -1], [1, 0]], shaft * 0.5 * u, height * 0.4 * u);
  ctx.fill();
  if (p.lit) {
    ctx.fillStyle = "rgba(255,205,120,0.9)";
    for (let i = -3; i <= 3; i++) ctx.fillRect(cx + i * podW * u * 0.22 - 1.5, h - podAt * u - 1.5, 3, 3);
  }
}

function dome(p: Pen, cx: number) {
  const { ctx, h, u } = p;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.ellipse(cx, h - 0.03 * u, 0.1 * u, 0.06 * u, 0, Math.PI, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(cx - 0.1 * u, h - 0.035 * u, 0.2 * u, 0.04 * u);
}

function operaHouse(p: Pen, x0: number) {
  const { ctx, h, u } = p;
  const k = 1.55;
  ctx.fillStyle = p.color;
  ctx.fillRect(x0 - 0.02 * u * k, h - 0.014 * u, 0.26 * u * k, 0.02 * u);
  const sail = (x: number, bw: number, hh: number, lean: number) => {
    ctx.beginPath();
    ctx.moveTo(x, h - 0.012 * u);
    ctx.quadraticCurveTo(x - bw * 0.15, h - hh * 0.85, x + lean, h - hh);
    ctx.quadraticCurveTo(x + bw * 0.65, h - hh * 0.45, x + bw, h - 0.012 * u);
    ctx.closePath();
    ctx.fill();
  };
  [[0, 0.06, 0.092], [0.03, 0.06, 0.078], [0.058, 0.055, 0.064], [0.084, 0.05, 0.05]].forEach(([dx, bw, hh]) =>
    sail(x0 + dx * u * k, bw * u * k, hh * u * k, bw * u * k * 0.55)
  );
  [[0.13, 0.05, 0.058], [0.16, 0.05, 0.046], [0.19, 0.04, 0.036]].forEach(([dx, bw, hh]) =>
    sail(x0 + dx * u * k, bw * u * k, hh * u * k, bw * u * k * 0.5)
  );
}

function harbourBridge(p: Pen, x0: number, span: number) {
  const { ctx, h, u } = p;
  const deck = h - 0.06 * u;
  const apex = h - 0.2 * u;
  const ctrl = h - 0.34 * u;
  ctx.strokeStyle = p.color;
  ctx.fillStyle = p.color;
  ctx.lineWidth = Math.max(3, 0.012 * u);
  ctx.beginPath();
  ctx.moveTo(x0, deck);
  ctx.quadraticCurveTo(x0 + span / 2, ctrl, x0 + span, deck);
  ctx.stroke();
  ctx.lineWidth = Math.max(2, 0.007 * u);
  ctx.beginPath();
  ctx.moveTo(x0 - 0.04 * u, deck + 0.004 * u);
  ctx.lineTo(x0 + span + 0.04 * u, deck + 0.004 * u);
  ctx.stroke();
  ctx.lineWidth = Math.max(1, 0.0025 * u);
  ctx.beginPath();
  for (let i = 1; i < 14; i++) {
    const t = i / 14;
    const y = (1 - t) * (1 - t) * deck + 2 * (1 - t) * t * ctrl + t * t * deck;
    const x = x0 + span * t;
    ctx.moveTo(x, deck);
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  for (const px of [x0 - 0.008 * u, x0 + span - 0.006 * u]) ctx.fillRect(px, h - 0.12 * u, 0.016 * u, 0.12 * u);
  void apex;
}

/** Draw a recognisable skyline with its famous landmarks. */
export function drawCityscape(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  city: CityId,
  opts: { color: string; lit: boolean; seed: number; low?: boolean }
) {
  const u = Math.min(h, w * 1.1);
  const p: Pen = { ctx, w, h, u, color: opts.color, lit: opts.lit, r: seeded(opts.seed) };
  const lo = opts.low ? 0.5 : 1;
  switch (city) {
    case "paris":
      filler(p, 0.03 * lo, 0.085 * lo, [[w * 0.5 - 0.16 * u, w * 0.5 + 0.16 * u]], 0.1);
      if (!opts.low) eiffel(p, w * 0.5);
      break;
    case "london":
      filler(p, 0.03 * lo, 0.09 * lo, [[w * 0.18, w * 0.42]], 0.1);
      if (!opts.low) {
        shard(p, w * 0.14);
        londonEye(p, w * 0.32);
        bigBen(p, w * 0.64);
      }
      break;
    case "newyork":
      filler(p, 0.05 * lo, 0.15 * lo, [], 0.14);
      if (!opts.low) {
        empireState(p, w * 0.36);
        oneWTC(p, w * 0.72);
      }
      break;
    case "toronto":
      filler(p, 0.04 * lo, 0.12 * lo, [[w * 0.1, w * 0.3]], 0.12);
      if (!opts.low) {
        dome(p, w * 0.2);
        tower(p, w * 0.58, 0.4, 0.014, 0.28, 0.048, 0.02);
      }
      break;
    case "auckland":
      filler(p, 0.03 * lo, 0.1 * lo, [], 0.12);
      if (!opts.low) tower(p, w * 0.55, 0.38, 0.012, 0.285, 0.046, 0.02);
      break;
    case "sydney": {
      const span = Math.min(0.5 * u, w * 0.5);
      filler(p, 0.03 * lo, 0.1 * lo, [[w * 0.05, w * 0.95]], 0.12);
      if (!opts.low) {
        harbourBridge(p, w * 0.08, span);
        operaHouse(p, Math.min(w * 0.62, w - 0.45 * u));
      }
      break;
    }
    default:
      break;
  }
}
