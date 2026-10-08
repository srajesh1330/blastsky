export type ShellKind =
  | "peony"
  | "chrysanthemum"
  | "willow"
  | "ring"
  | "palm"
  | "crackle"
  | "double"
  | "crossette"
  | "spiral"
  | "pistil"
  | "saturn"
  | "horsetail"
  | "kamuro"
  | "triple"
  | "serpent"
  | "comet"
  | "strobe"
  | "brocade"
  | "dahlia"
  | "twocolor"
  | "silver"
  | "tripistil"
  | "colorchange"
  | "chryscrackle"
  | "text";

export type Theme = "mixed" | "gold" | "newyear" | "patriotic" | "christmas" | "rainbow";

/** Shells that play the Boom1 sound (single blasts play Boom2). */
const DOUBLE_KINDS: ShellKind[] = ["double", "saturn", "triple"];

export interface BurstInfo {
  double: boolean;
  y01: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  h: number;
  h2: number;
  size: number;
  drag: number;
  g: number;
  glitter: boolean;
  trail: number;
  dust: boolean;
  sat: number;
  split: number;
  wob?: number;
  blink?: number;
  ph?: number;
  sw?: number;
}

interface Rocket {
  x0: number;
  y0: number;
  tx: number;
  ty: number;
  t: number;
  T: number;
  kind: ShellKind;
  text?: string;
  textLife?: number;
  sway: number;
  px: number;
  py: number;
  lx: number;
  ly: number;
  hist: number[];
  ht: number;
}

type Tag = "show" | "finale";

interface Puff {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  grow: number;
  age: number;
  life: number;
  peak: number;
  glow: number;
  glowHue: number;
}

// Colours for the long "falling" family (brocade, kamuro): gold is most common.
const FAMILY: Swatch[] = [[44, 100], [44, 100], [210, 12], [14, 100], [130, 100], [225, 100], [320, 100], [0, 100]];

const MAX_PUFFS = 48;

interface Delayed {
  t: number;
  fn: () => void;
  tag?: Tag;
}

interface BurstOptions {
  count: number;
  speed: number;
  life: number;
  drag: number;
  g: number;
  h: number;
  h2: number;
  size?: number;
  glitter?: boolean;
  trail?: number;
  sat?: number;
  split?: number;
  wob?: number;
  blink?: number;
  hAlt?: number;
  sw?: number;
  shape?: "sphere" | "ring" | "palm" | "spiral" | "cone" | "rose";
}

type Swatch = [number, number];
const W: Swatch = [210, 10];
const PALETTES: Record<Theme, Swatch[]> = {
  mixed: [[0, 100], [12, 100], [42, 100], [52, 100], [120, 100], [160, 100], [190, 100], [215, 100], [275, 100], [320, 100], W],
  gold: [[42, 100], [36, 100], [28, 100], [50, 100], [12, 100], W],
  newyear: [[46, 100], [40, 100], W, W, [200, 60]],
  patriotic: [[0, 100], [0, 100], W, [225, 100], [225, 100]],
  christmas: [[0, 100], [120, 100], [46, 100], W],
  rainbow: [[0, 100], [30, 100], [55, 100], [120, 100], [190, 100], [240, 100], [285, 100]],
};
const SPARK_CAP = 3200; // decorative sparks (tails, dust, ground pieces)
const HARD_CAP = 4800; // absolute limit; shell bursts may always use the space up to here

/** Small seeded random generator, so "today's show" is the same for everyone on a given day. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SHOW_NAMES = [
  "Golden Harbour", "Midnight Bloom", "Silver Rain", "Crimson Crown", "Emerald Night",
  "Lantern Night", "Thunder Garden", "Velvet Sky", "Sunrise Festival", "Comet Carnival",
];

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(list: T[]): T => list[Math.floor(Math.random() * list.length)];

const WEIGHTS: [ShellKind, number][] = [
  ["peony", 16], ["chrysanthemum", 11], ["willow", 7], ["ring", 6], ["palm", 6],
  ["crackle", 8], ["double", 8], ["crossette", 7], ["spiral", 5],
  ["pistil", 9], ["saturn", 5], ["horsetail", 4], ["kamuro", 8], ["triple", 5], ["serpent", 4], ["comet", 4], ["strobe", 4], ["brocade", 8], ["dahlia", 4], ["twocolor", 5], ["silver", 5], ["tripistil", 6], ["colorchange", 6], ["chryscrackle", 5],
];

function pickKind(): ShellKind {
  const total = WEIGHTS.reduce((a, w) => a + w[1], 0);
  let r = Math.random() * total;
  for (const [kind, weight] of WEIGHTS) {
    r -= weight;
    if (r <= 0) return kind;
  }
  return "peony";
}

/** Night sky, stars and a distant, paler city. Drawn once per resize, behind everything. */
export function drawScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#01020a");
  sky.addColorStop(0.65, "#070d24");
  sky.addColorStop(1, "#16223f");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const srng = mulberry32(7);
  for (let i = 0; i < Math.floor((w * h) / 5500); i++) {
    ctx.globalAlpha = 0.15 + srng() * 0.7;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(srng() * w, srng() * h * 0.8, 0.6 + srng(), 0.6 + srng());
  }
  ctx.globalAlpha = 1;

  // Far skyline: lower and paler, so the near city in front has depth.
  const rng = mulberry32(99);
  let x = -10;
  while (x < w) {
    const bw = 28 + rng() * 60;
    const bh = h * (0.03 + rng() * 0.09);
    ctx.fillStyle = "#0b1329";
    ctx.fillRect(x, h - bh, bw, bh);
    for (let wy = h - bh + 7; wy < h - 6; wy += 11) {
      for (let wx = x + 5; wx < x + bw - 6; wx += 9) {
        if (rng() < 0.07) {
          ctx.fillStyle = "rgba(255,205,120,0.22)";
          ctx.fillRect(wx, wy, 2, 3);
        }
      }
    }
    x += bw + rng() * 3;
  }
}

/**
 * The near city, drawn on a layer IN FRONT of the fireworks. Every shell starts at the very
 * bottom, so it appears to rise from behind these buildings.
 */
export function drawSkyline(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  const rng = mulberry32(2024);

  // A continuous base, so no rocket can show through the gaps between buildings.
  ctx.fillStyle = "#04060c";
  ctx.fillRect(0, h - h * 0.05, w, h * 0.05);

  let x = -10;
  while (x < w) {
    const bw = 28 + rng() * 52;
    const bh = h * (0.055 + rng() * 0.12);
    ctx.fillStyle = "#04060c";
    ctx.fillRect(x, h - bh, bw, bh);
    for (let wy = h - bh + 8; wy < h - 6; wy += 11) {
      for (let wx = x + 5; wx < x + bw - 6; wx += 9) {
        if (rng() < 0.13) {
          ctx.fillStyle = `rgba(255,205,120,${0.3 + rng() * 0.5})`;
          ctx.fillRect(wx, wy, 3, 4);
        }
      }
    }
    x += bw + rng() * 4;
  }
}

export class FireworksEngine {
  onBurst?: (info: BurstInfo) => void;
  onLaunch?: () => void;
  onTagDone?: (tag: Tag) => void;

  private ctx: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;
  private s = 1;
  private quality = 1;
  private sparks: Spark[] = [];
  private rockets: Rocket[] = [];
  private delayed: Delayed[] = [];
  private raf = 0;
  private last = 0;
  private timer = 1;
  private auto = true;
  private flash = 0;
  private flashX = 0;
  private flashY = 0;
  private flashHue = 40;
  private palette: Swatch[] = PALETTES.mixed;
  private curSat = 100;
  private cores: { x: number; y: number; age: number }[] = [];
  private emitters: { x: number; y: number; t: number; T: number; kind: "fountain" | "wheel"; hue: number; a: number }[] = [];
  private launchScale = 1;
  private maxSparks = SPARK_CAP;
  private burstScale = 1;
  private avgDt = 1 / 60;
  private puffSprite: HTMLCanvasElement | null = null;
  private smokeCtx: CanvasRenderingContext2D | null = null;
  private puffs: Puff[] = [];
  private smokeDirty = false;
  private windT = Math.random() * 100;
  private pending: Record<Tag, number> = { show: 0, finale: 0 };

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not supported");
    this.ctx = ctx;
  }

  resize(w: number, h: number, dpr: number) {
    this.w = w;
    this.h = h;
    this.s = Math.max(0.55, Math.min(1.5, Math.min(w, h * 1.2) / 750));
    this.quality = w < 640 ? 0.6 : 1;
    const canvas = this.ctx.canvas;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (this.smokeCtx) {
      const sc = this.smokeCtx.canvas;
      // Smoke is soft, so it is drawn at half resolution (4x cheaper).
      sc.width = Math.floor(w * dpr * 0.5);
      sc.height = Math.floor(h * dpr * 0.5);
      this.smokeCtx.setTransform(dpr * 0.5, 0, 0, dpr * 0.5, 0, 0);
    }
  }

  /** Optional layer under the fireworks that shows drifting smoke. */
  attachSmoke(canvas: HTMLCanvasElement) {
    this.smokeCtx = canvas.getContext("2d");
  }

  /** 1 = normal, above 1 = slower climb, below 1 = faster climb. */
  setLaunchScale(scale: number) {
    this.launchScale = scale;
  }

  /** Climb time grows with height so every shell rises at a calm, steady pace. */
  private flightTime(ty: number) {
    const dist = Math.max(120, this.h * 0.97 - ty);
    const base = Math.max(1.6, Math.min(3.0, dist / (230 * this.s)));
    return base * rand(0.92, 1.08) * this.launchScale;
  }

  /** Write a short message in the sky with sparks. */
  writeText(text: string, opts: { life?: number; fy?: number } = {}) {
    const t = text.trim().slice(0, 24);
    if (!t || this.w === 0) return;
    this.launch(this.w / 2, this.h * (opts.fy ?? 0.3), "text");
    const r = this.rockets[this.rockets.length - 1];
    r.x0 = this.w / 2 + rand(-40, 40);
    r.text = t;
    r.textLife = opts.life ?? 4.2;
  }

  /** Count down out loud with big numbers, then a message and a finale. */
  playCountdown(from = 10, last = "HAPPY NEW YEAR") {
    if (this.isRunning("show")) return;
    let t = 0;
    for (let n = from; n >= 1; n--) {
      const label = String(n);
      this.later(t, () => this.writeText(label, { life: 1.6, fy: 0.34 }), "show");
      t += 1.8;
    }
    this.later(t + 0.3, () => this.writeText(last, { life: 5.5 }), "show");
    this.later(t + 1.2, () => this.finale(30, "show"), "show");
  }

  /** Colour for brocade / kamuro: gold, silver, red, green, blue... or the chosen theme. */
  private familyColour(): Swatch {
    return this.palette === PALETTES.mixed ? pick(FAMILY) : pick(this.palette);
  }

  /** A scripted show that is the same for everyone on a given day. */
  playDaily(day: number): { name: string; theme: Theme } {
    const themes: Theme[] = ["mixed", "gold", "newyear", "patriotic", "christmas", "rainbow"];
    const rng = mulberry32(day * 2654435761);
    const theme = themes[Math.floor(rng() * themes.length)];
    const name = SHOW_NAMES[Math.floor(rng() * SHOW_NAMES.length)];
    if (this.isRunning("show")) return { name: "", theme };

    this.setTheme(theme);
    const kinds = WEIGHTS.map((w) => w[0]);
    const at = (time: number, fn: () => void) => this.later(time, fn, "show");
    const shell = (time: number) => {
      const k = kinds[Math.floor(rng() * kinds.length)];
      const fx = 0.15 + rng() * 0.7;
      const fy = 0.15 + rng() * 0.32;
      at(time, () => this.launch(this.w * fx, this.h * fy, k));
    };

    let t = 0;
    for (let i = 0; i < 6; i++) { shell(t); t += 1.6 + rng(); }
    for (let i = 0; i < 14; i++) {
      shell(t);
      if (rng() < 0.35) shell(t + 0.2);
      t += 0.7 + rng() * 0.5;
    }
    at(t + 1.2, () => this.finale(26, "show"));
    return { name, theme };
  }

  setTheme(theme: Theme) {
    this.palette = PALETTES[theme];
  }

  private later(t: number, fn: () => void, tag?: Tag) {
    this.delayed.push({ t, fn, tag });
    if (tag) this.pending[tag] += 1;
  }

  isRunning(tag: Tag) {
    return this.pending[tag] > 0;
  }

  /** Cancel a scheduled show or finale. Shells already in the air finish normally. */
  stop(tag: Tag) {
    this.delayed = this.delayed.filter((d) => d.tag !== tag);
    this.pending[tag] = 0;
    this.onTagDone?.(tag);
  }

  /** A scripted ~55 second show: slow start, building up, then a big finale. */
  playShow() {
    if (this.isRunning("show")) return;
    let t = 0;
    const at = (time: number, fn: () => void) => this.later(time, fn, "show");
    while (t < 16) { at(t, () => this.launch()); t += rand(1.2, 1.8); }
    while (t < 34) {
      at(t, () => this.launch());
      if (Math.random() < 0.3) at(t + 0.15, () => this.launch());
      t += rand(0.6, 1.0);
    }
    while (t < 46) { at(t, () => this.launch()); at(t + 0.1, () => this.launch()); t += rand(0.35, 0.6); }
    at(t + 1, () => this.finale(34, "show"));
  }

  setAuto(on: boolean) {
    this.auto = on;
  }

  start() {
    cancelAnimationFrame(this.raf);
    this.last = performance.now();
    const loop = (now: number) => {
      const raw = (now - this.last) / 1000;
      const dt = Math.min(0.1, raw);
      // Adaptive quality: if frames get slow, allow fewer sparks; recover when fast again.
      this.avgDt = this.avgDt * 0.95 + Math.min(raw, 0.2) * 0.05;
      if (this.avgDt > 1 / 40) {
        this.maxSparks = Math.max(900, Math.floor(this.maxSparks * 0.97));
        this.burstScale = Math.max(0.5, this.burstScale * 0.99);
      } else if (this.avgDt < 1 / 52) {
        this.maxSparks = Math.min(SPARK_CAP, this.maxSparks + 8);
        this.burstScale = Math.min(1, this.burstScale + 0.004);
      }
      this.last = now;
      this.step(dt);
      this.draw(dt);
      this.drawSmoke();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.sparks = [];
    this.rockets = [];
    this.delayed = [];
    this.pending = { show: 0, finale: 0 };
  }

  launch(x?: number, y?: number, kind?: ShellKind) {
    const tx = x ?? rand(this.w * 0.12, this.w * 0.88);
    const ty = Math.min(this.h * 0.8, y ?? rand(this.h * 0.12, this.h * 0.5));
    const x0 = Math.max(20, Math.min(this.w - 20, tx + rand(-45, 45)));
    this.rockets.push({
      x0,
      y0: this.h * 0.97,
      tx,
      ty,
      t: 0,
      T: this.flightTime(ty),
      kind: kind ?? pickKind(),
      sway: rand(-5, 5),
      px: x0,
      py: this.h * 0.97,
      lx: x0,
      ly: this.h * 0.97,
      hist: [x0, this.h * 0.97, 0],
      ht: 0,
    });

    // Mortar kick at the ground: a puff of gold sparks and a small flash.
    for (let q = 0; q < 16 && this.sparks.length < this.maxSparks; q++) {
      this.sparks.push({
        x: x0, y: this.h * 0.97, vx: rand(-70, 70) * this.s, vy: rand(-90, -10) * this.s,
        age: 0, life: rand(0.3, 0.7), h: 40, h2: 18, size: 1.4, drag: 0.94, g: 90 * this.s,
        glitter: false, trail: 0, dust: true, sat: 100, split: 0,
      });
    }
    this.flashAt(x0, this.h * 0.97, 40, 0.12);
    this.spawnSmoke(x0, this.h * 0.97, 0.45);
    this.onLaunch?.();
  }

  finale(count = 14, tag: Tag = "finale") {
    if (tag === "finale" && this.isRunning("finale")) return;
    for (let i = 0; i < count; i++) {
      this.later(i * 0.14, () => this.launch(), tag);
    }
  }

  private rocketPos(r: Rocket) {
    const f = Math.min(1, r.t / r.T);
    const ease = 1 - Math.pow(1 - f, 2);
    return {
      f,
      x: r.x0 + (r.tx - r.x0) * f + Math.sin(f * 9) * r.sway * (1 - f),
      y: r.y0 + (r.ty - r.y0) * ease,
    };
  }

  private step(dt: number) {
    if (this.auto) {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.launch();
        if (Math.random() < 0.25) this.launch();
        this.timer = rand(0.6, 1.7);
        if (Math.random() < 0.07) this.groundFx();
      }
    }

    for (let i = this.delayed.length - 1; i >= 0; i--) {
      const d = this.delayed[i];
      d.t -= dt;
      if (d.t <= 0) {
        this.delayed.splice(i, 1);
        d.fn();
        if (d.tag) {
          this.pending[d.tag] = Math.max(0, this.pending[d.tag] - 1);
          if (this.pending[d.tag] === 0) this.onTagDone?.(d.tag);
        }
      }
    }

    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.t += dt;
      const { f, x, y } = this.rocketPos(r);
      // A real shell is a dark object. What you see is a thin hot streak at the front and a
      // shower of small orange sparks that fall away behind it.
      r.ht += dt;
      if (r.ht >= 0.025) {
        r.ht = 0;
        r.hist.push(r.px, r.py, r.t);
      }
      r.lx = r.px;
      r.ly = r.py;
      const dist = Math.hypot(x - r.lx, y - r.ly);
      const n = Math.max(1, Math.min(14, Math.ceil(dist / 3)));
      for (let k = 0; k < n && this.sparks.length < this.maxSparks - 250; k++) {
        const u = (k + Math.random()) / n;
        this.sparks.push({
          x: r.lx + (x - r.lx) * u,
          y: r.ly + (y - r.ly) * u,
          vx: rand(-24, 24) * this.s,
          vy: rand(6, 40) * this.s,
          age: 0,
          life: rand(0.5, 1.35),
          h: 44,
          h2: 12,
          size: rand(0.8, 1.7),
          drag: 0.93,
          g: 60 * this.s,
          glitter: Math.random() < 0.55,
          trail: 0,
          dust: true,
          sat: 100,
          split: 0,
        });
      }
      r.px = x;
      r.py = y;
      if (f >= 1) {
        this.rockets.splice(i, 1);
        this.explode(x, y, r.kind, r.text, r.textLife);
      }
    }

    for (let i = this.emitters.length - 1; i >= 0; i--) {
      const em = this.emitters[i];
      em.t += dt;
      if (em.t >= em.T) {
        this.emitters.splice(i, 1);
        continue;
      }
      const per = Math.round((em.kind === "fountain" ? 12 : 9) * this.quality);
      for (let k = 0; k < per && this.sparks.length < this.maxSparks - 300; k++) {
        if (em.kind === "fountain") {
          const a = -Math.PI / 2 + rand(-0.26, 0.26);
          const sp = rand(240, 430) * this.s;
          this.sparks.push({
            x: em.x, y: em.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
            age: 0, life: rand(0.9, 1.6), h: 44, h2: 16, size: rand(1.1, 1.7), drag: 0.965,
            g: 300 * this.s, glitter: Math.random() < 0.3, trail: 0, dust: false, sat: 100, split: 0,
          });
        } else {
          em.a += 0.16;
          const ang = em.a + rand(-0.05, 0.05);
          const sp = rand(260, 340) * this.s;
          this.sparks.push({
            x: em.x + Math.cos(ang) * 14, y: em.y + Math.sin(ang) * 14,
            vx: Math.cos(ang + Math.PI / 2) * sp, vy: Math.sin(ang + Math.PI / 2) * sp,
            age: 0, life: rand(0.6, 1.1), h: em.hue, h2: em.hue + 25, size: 1.5, drag: 0.955,
            g: 140 * this.s, glitter: false, trail: 0, dust: false, sat: 100, split: 0,
          });
        }
      }
    }

    this.windT += dt;
    const wind = 7 * Math.sin(this.windT * 0.11) + 4;
    for (let i = this.puffs.length - 1; i >= 0; i--) {
      const q = this.puffs[i];
      q.age += dt;
      if (q.age >= q.life) {
        this.puffs.splice(i, 1);
        continue;
      }
      q.x += (q.vx + wind) * dt;
      q.y += q.vy * dt;
      q.r += q.grow * dt;
      q.glow *= Math.pow(0.03, dt);
    }

    const grow: Spark[] = [];
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const p = this.sparks[i];
      p.age += dt;
      if (p.age >= p.life) {
        { const last = this.sparks.pop(); if (last && i < this.sparks.length) this.sparks[i] = last; }
        continue;
      }
      if (p.split > 0 && p.age >= p.split) {
        const base = Math.random() * Math.PI;
        for (let q = 0; q < 4; q++) {
          const a = base + (q * Math.PI) / 2;
          grow.push({
            x: p.x, y: p.y, vx: p.vx * 0.3 + Math.cos(a) * 110 * this.s, vy: p.vy * 0.3 + Math.sin(a) * 110 * this.s,
            age: 0, life: 0.9, h: p.h, h2: p.h2, size: 1.5, drag: 0.965, g: 40 * this.s,
            glitter: false, trail: 0, dust: false, sat: p.sat, split: 0,
          });
        }
        { const last = this.sparks.pop(); if (last && i < this.sparks.length) this.sparks[i] = last; }
        continue;
      }
      if (p.wob) {
        p.vx += Math.sin(p.age * 20 + (p.ph ?? 0)) * p.wob * dt * 60;
        p.vy += Math.cos(p.age * 17 + (p.ph ?? 0)) * p.wob * dt * 60;
      }
      const k = Math.pow(p.drag, dt * 60);
      p.vx *= k;
      p.vy = p.vy * k + p.g * dt;
      const ox = p.x;
      const oy = p.y;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.trail > 0 && this.sparks.length + grow.length < this.maxSparks) {
        // Shed dust along the path travelled, so falling trails are continuous.
        const m = (Math.hypot(p.x - ox, p.y - oy) * p.trail) / 5;
        let count = Math.floor(m);
        if (Math.random() < m - count) count++;
        for (let n2 = 0; n2 < count && n2 < 4; n2++) {
          const u = Math.random();
          grow.push({
            x: ox + (p.x - ox) * u, y: oy + (p.y - oy) * u,
            vx: p.vx * 0.04 + rand(-7, 7), vy: p.vy * 0.04 + rand(-3, 10),
            age: 0, life: rand(0.6, 1.2), h: p.h, h2: p.h2, size: 1.0,
            drag: 0.95, g: 26 * this.s, glitter: false, trail: 0, dust: true, sat: p.sat, split: 0,
          });
        }
      }
    }
    for (const g of grow) this.sparks.push(g);
  }

  private draw(dt: number) {
    const ctx = this.ctx;

    if (!this.sparks.length && !this.rockets.length && !this.emitters.length) {
      ctx.clearRect(0, 0, this.w, this.h);
      return;
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = `rgba(0,0,0,${1 - Math.pow(0.0009, dt)})`;
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.globalCompositeOperation = "lighter";

    if (this.flash > 0.02) {
      const rad = Math.min(this.w, this.h) * 0.7;
      const g = ctx.createRadialGradient(this.flashX, this.flashY, 0, this.flashX, this.flashY, rad);
      g.addColorStop(0, `hsla(${this.flashHue},90%,65%,${this.flash * 0.16})`);
      g.addColorStop(1, `hsla(${this.flashHue},90%,50%,0)`);
      ctx.fillStyle = g;
      ctx.fillRect(this.flashX - rad, this.flashY - rad, rad * 2, rad * 2);
      this.flash *= Math.pow(0.02, dt);
    }

    for (let i = this.cores.length - 1; i >= 0; i--) {
      const c = this.cores[i];
      c.age += dt;
      if (c.age > 0.16) {
        this.cores.splice(i, 1);
        continue;
      }
      const r = (40 + c.age * 420) * this.s;
      const cg = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, r);
      const life = 1 - c.age / 0.16;
      cg.addColorStop(0, `rgba(255,250,225,${0.9 * life})`);
      cg.addColorStop(0.35, `rgba(255,214,140,${0.35 * life})`);
      cg.addColorStop(1, "rgba(255,180,90,0)");
      ctx.fillStyle = cg;
      ctx.fillRect(c.x - r, c.y - r, r * 2, r * 2);
    }

    ctx.lineCap = "round";
    // Sparks are grouped by (quantised) colour, alpha and width, so each group is
    // one path and one stroke. This is much faster than one stroke per spark.
    const buckets = new Map<number, { style: string; w: number; seg: number[] }>();
    for (const p of this.sparks) {
      const f = p.age / p.life;
      const hue =
        p.sw !== undefined
          ? f < p.sw ? p.h : p.h2
          : f < 0.55 ? p.h : p.h + (p.h2 - p.h) * ((f - 0.55) / 0.45);
      const light = f < 0.1 ? 92 - (f / 0.1) * 32 : 60 - (f - 0.1) * 22;
      const sat = Math.min(p.sat, f < 0.1 ? 35 + f * 650 : 100);
      let a = f < 0.6 ? 1 : 1 - (f - 0.6) / 0.4;
      if (p.glitter && f > 0.25) a *= Math.random() < 0.5 ? 0.12 : 1;
      if (p.dust) a *= 0.55;
      else if (!p.glitter) a *= 0.85 + Math.random() * 0.15;
      if (p.blink && Math.sin(p.age * p.blink + (p.ph ?? 0)) < 0.25) a *= 0.04;
      const aq = Math.round(a * 6);
      if (aq < 1) continue;

      const tl = Math.max(0.026, dt * 1.1); // streak covers the distance moved, even on slow frames
      const w = p.size * (1 - f * 0.45) * (f < 0.08 ? 1.7 : 1);
      const hq = ((Math.round(hue / 6) * 6) % 360 + 360) % 360;
      const sq = Math.round(sat / 20) * 20;
      const lq = Math.max(0, Math.round(light / 8) * 8);
      const wq = Math.max(2, Math.round(w * 2));
      const key = ((((hq * 101 + sq) * 101 + lq) * 8 + aq) * 20 + wq);

      let b = buckets.get(key);
      if (!b) {
        b = { style: `hsla(${hq},${sq}%,${lq}%,${aq / 6})`, w: wq / 2, seg: [] };
        buckets.set(key, b);
      }
      b.seg.push(p.x - p.vx * tl, p.y - p.vy * tl, p.x, p.y);

      // Soft halo around the bigger, still-hot stars.
      if (!p.dust && p.size >= 1.6 && f < 0.6) {
        const hkey = -key;
        let hb = buckets.get(hkey);
        if (!hb) {
          hb = { style: `hsla(${hq},${sq}%,${Math.min(88, lq + 12)}%,${(aq / 6) * 0.2})`, w: (wq / 2) * 3.4, seg: [] };
          buckets.set(hkey, hb);
        }
        hb.seg.push(p.x - p.vx * tl * 0.8, p.y - p.vy * tl * 0.8, p.x, p.y);

        // White-hot core at the head of the streak.
        const ckey = -(key + 1e11);
        let cb = buckets.get(ckey);
        if (!cb) {
          cb = { style: `hsla(${hq},${Math.max(0, sq - 45)}%,${Math.min(97, lq + 30)}%,${Math.min(1, aq / 6)})`, w: Math.max(1, wq / 2), seg: [] };
          buckets.set(ckey, cb);
        }
        cb.seg.push(p.x - p.vx * tl * 0.35, p.y - p.vy * tl * 0.35, p.x, p.y);
      }
    }
    for (const b of buckets.values()) {
      ctx.strokeStyle = b.style;
      ctx.lineWidth = b.w;
      ctx.beginPath();
      for (let k = 0; k < b.seg.length; k += 4) {
        ctx.moveTo(b.seg[k], b.seg[k + 1]);
        ctx.lineTo(b.seg[k + 2], b.seg[k + 3]);
      }
      ctx.stroke();
    }

    ctx.lineCap = "round";
    for (const r of this.rockets) {
      // Thin hot streak: only the last quarter second of travel, fading toward the back.
      const pts = r.hist;
      let k = pts.length / 3 - 1;
      const minT = r.t - 0.25;
      while (k > 0 && pts[k * 3 + 2] >= minT) k--;
      const seg = Math.max(0, k);
      const n = pts.length / 3;
      for (let q = 0; q < 3; q++) {
        const i0 = seg + Math.floor(((n - seg) * q) / 3);
        const i1 = Math.min(n, seg + Math.ceil(((n - seg) * (q + 1)) / 3) + 1);
        const last = q === 2;
        if (i1 - i0 < 2 && !last) continue;
        const u = (q + 1) / 3;
        ctx.strokeStyle = `hsla(40,100%,${70 + u * 20}%,${0.12 + 0.4 * u * u})`;
        ctx.lineWidth = 0.8 + 0.9 * u;
        ctx.beginPath();
        const a = Math.min(i0, n - 1);
        ctx.moveTo(pts[a * 3], pts[a * 3 + 1]);
        for (let m = i0 + 1; m < i1; m++) ctx.lineTo(pts[m * 3], pts[m * 3 + 1]);
        if (last) ctx.lineTo(r.px, r.py);
        ctx.stroke();
      }

      // Small flickering hot spot at the head, like a burning fuse.
      const flick = 0.75 + Math.random() * 0.25;
      ctx.fillStyle = `hsla(40,100%,60%,${0.16 * flick})`;
      ctx.beginPath();
      ctx.arc(r.px, r.py, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `hsla(46,100%,93%,${0.95 * flick})`;
      ctx.beginPath();
      ctx.arc(r.px, r.py, 1.5 + Math.random() * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  }

  /** Turn text into points and let them expand from the burst centre into the letters. */
  private textBurst(x: number, y: number, text: string, life: number) {
    if (typeof document === "undefined") return;
    const fs = 80;
    const c = document.createElement("canvas");
    const g = c.getContext("2d");
    if (!g) return;
    const font = `900 ${fs}px "Segoe UI", system-ui, sans-serif`;
    g.font = font;
    const w = Math.ceil(g.measureText(text).width) + 24;
    const h = fs + 40;
    c.width = w;
    c.height = h;
    g.font = font;
    g.textBaseline = "middle";
    g.fillStyle = "#fff";
    g.fillText(text, 12, h / 2);
    const data = g.getImageData(0, 0, w, h).data;

    let step = 3;
    let pts: number[] = [];
    for (;;) {
      pts = [];
      for (let py = 0; py < h; py += step) {
        for (let px = 0; px < w; px += step) {
          if (data[(py * w + px) * 4 + 3] > 128) pts.push(px, py);
        }
      }
      if (pts.length / 2 <= 460 || step > 14) break;
      step++;
    }

    const k = Math.min((this.w * 0.82) / w, (this.h * 0.4) / h);
    const DRAG = 0.94;
    const reach = 1 / (-60 * Math.log(DRAG)); // distance travelled = speed * reach
    const [hue, sat] = pick(this.palette);
    const cx = Math.max(w * k * 0.5 + 10, Math.min(this.w - w * k * 0.5 - 10, x));

    for (let i = 0; i < pts.length; i += 2) {
      if (this.sparks.length >= HARD_CAP) return;
      const dx = (pts[i] - w / 2) * k;
      const dy = (pts[i + 1] - h / 2) * k;
      this.sparks.push({
        x: cx, y, vx: dx / reach, vy: dy / reach, age: 0, life: life * rand(0.96, 1.04),
        h: hue, h2: hue, size: 2.3, drag: DRAG, g: 12 * this.s, glitter: false, trail: 0,
        dust: false, sat, split: 0,
      });
    }
  }

  private burst(x: number, y: number, o: BurstOptions) {
    const shape = o.shape ?? "sphere";
    // Ring, dahlia and spiral must keep their outline, so they use identical speed, drag and
    // life for every spark and are never thinned out by the adaptive quality.
    const precise = shape === "ring" || shape === "spiral" || shape === "rose";
    const scale = precise ? Math.max(0.8, this.burstScale) : this.burstScale;
    const n = Math.max(8, Math.floor(o.count * this.quality * scale));

    for (let i = 0; i < n; i++) {
      // Shell bursts may always use the space up to HARD_CAP, so a shell never opens empty.
      if (this.sparks.length >= HARD_CAP) return;
      let vx: number;
      let vy: number;
      let speed = o.speed * this.s * (precise ? 1 : 0.93 + Math.random() * 0.14);

      if (shape === "ring") {
        const a = (i / n) * Math.PI * 2;
        const ex = Math.cos(a) * speed;
        const ey = Math.sin(a) * speed * 0.42;
        const tilt = 0.6;
        vx = ex * Math.cos(tilt) - ey * Math.sin(tilt);
        vy = ex * Math.sin(tilt) + ey * Math.cos(tilt);
      } else if (shape === "spiral") {
        // Two arms, two and a half turns each, growing outward from the centre.
        const t = (i >> 1) / (n / 2);
        const a = t * Math.PI * 5 + (i & 1) * Math.PI;
        const r = 0.2 + 0.8 * t;
        vx = Math.cos(a) * speed * r;
        vy = Math.sin(a) * speed * r;
      } else if (shape === "rose") {
        // Dahlia: six petals, outline plus some fill.
        const a = (i / n) * Math.PI * 2;
        const r = (0.25 + 0.75 * Math.abs(Math.cos(3 * a))) * (i % 3 === 0 ? rand(0.35, 0.9) : 1);
        vx = Math.cos(a) * r * speed;
        vy = Math.sin(a) * r * speed;
      } else if (shape === "cone") {
        const a = -Math.PI / 2 + rand(-0.6, 0.6);
        speed *= rand(0.55, 1.0);
        vx = Math.cos(a) * speed;
        vy = Math.sin(a) * speed;
      } else if (shape === "palm") {
        const arms = 8;
        const a = ((i % arms) / arms) * Math.PI * 2 + rand(-0.04, 0.04);
        speed *= rand(0.45, 1.05);
        vx = Math.cos(a) * speed;
        vy = Math.sin(a) * speed - 30 * this.s;
      } else {
        const a = Math.random() * Math.PI * 2;
        const flat = Math.sqrt(1 - Math.pow(rand(-1, 1), 2));
        vx = Math.cos(a) * flat * speed;
        vy = Math.sin(a) * flat * speed;
      }

      this.sparks.push({
        x, y, vx, vy, age: 0,
        life: precise ? o.life : o.life * rand(0.85, 1.12),
        h: o.hAlt !== undefined && vx < 0 ? o.hAlt : o.h,
        h2: o.hAlt !== undefined && vx < 0 ? o.hAlt : o.h2,
        size: (o.size ?? 1.7) * (precise ? 1 : rand(0.85, 1.25)),
        drag: precise ? o.drag : o.drag * (1 + rand(-0.002, 0.002)),
        g: o.g * this.s * (precise ? 0.55 : 1),
        glitter: o.glitter ?? false, trail: o.trail ?? 0, dust: false, sat: o.sat ?? this.curSat, split: o.split ?? 0,
        wob: o.wob, blink: o.blink, ph: Math.random() * 6.28, sw: o.sw,
      });
    }
  }

  /** Light, drifting smoke that hangs where a shell burst. */
  private spawnSmoke(x: number, y: number, size = 1) {
    const n = Math.max(1, Math.round(3 * size * this.quality));
    for (let i = 0; i < n && this.puffs.length < MAX_PUFFS; i++) {
      const spread = 70 * this.s * size;
      this.puffs.push({
        x: x + rand(-spread, spread),
        y: y + rand(-spread * 0.8, spread * 0.8),
        vx: rand(-6, 6),
        vy: rand(-7, -1),
        r: rand(26, 44) * this.s * (0.6 + size * 0.4),
        grow: rand(3, 7) * this.s,
        age: 0,
        life: rand(4.5, 8),
        peak: rand(0.03, 0.07) * (0.5 + size * 0.5),
        glow: 0,
        glowHue: 40,
      });
    }
  }

  private getPuffSprite(): HTMLCanvasElement | null {
    if (this.puffSprite) return this.puffSprite;
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 64;
    const g = c.getContext("2d");
    if (!g) return null;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(120,130,150,1)");
    grad.addColorStop(0.5, "rgba(100,110,132,0.5)");
    grad.addColorStop(1, "rgba(90,100,122,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    this.puffSprite = c;
    return c;
  }

  private drawSmoke() {
    const ctx = this.smokeCtx;
    if (!ctx) return;
    if (!this.puffs.length) {
      if (this.smokeDirty) {
        ctx.clearRect(0, 0, this.w, this.h);
        this.smokeDirty = false;
      }
      return;
    }
    this.smokeDirty = true;
    ctx.clearRect(0, 0, this.w, this.h);

    const sprite = this.getPuffSprite();
    if (!sprite) return;
    ctx.globalCompositeOperation = "source-over";
    for (const q of this.puffs) {
      const f = q.age / q.life;
      const fadeIn = Math.min(1, q.age / 1.0);
      const fadeOut = f < 0.45 ? 1 : 1 - (f - 0.45) / 0.55;
      const a = q.peak * fadeIn * fadeOut;
      if (a <= 0.004) continue;
      ctx.globalAlpha = a;
      ctx.drawImage(sprite, q.x - q.r, q.y - q.r, q.r * 2, q.r * 2);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  /** The bright white "break" as the shell opens: a flash core plus a few fast white sparks. */
  private breakFlash(x: number, y: number) {
    this.cores.push({ x, y, age: 0 });
    const n = Math.round(26 * this.quality);
    for (let i = 0; i < n && this.sparks.length < HARD_CAP; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = rand(380, 620) * this.s;
      this.sparks.push({
        x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, age: 0, life: rand(0.16, 0.34),
        h: 48, h2: 40, size: 2.2, drag: 0.9, g: 20 * this.s, glitter: false, trail: 0,
        dust: false, sat: 12, split: 0,
      });
    }
  }

  /** Ground pieces: a fountain of gold sparks or a spinning wheel. */
  groundFx(kind?: "fountain" | "wheel", x?: number) {
    if (this.emitters.length >= 4) return;
    const k = kind ?? (Math.random() < 0.5 ? "fountain" : "wheel");
    this.emitters.push({
      x: x ?? rand(this.w * 0.15, this.w * 0.85),
      y: this.h * 0.97,
      t: 0,
      T: rand(3.0, 4.5),
      kind: k,
      hue: pick(this.palette)[0],
      a: Math.random() * 6,
    });
    this.flashAt(this.emitters[this.emitters.length - 1].x, this.h * 0.97, 40, 0.1);
  }

  private flashAt(x: number, y: number, hue: number, amount: number) {
    if (amount > 0.3) {
      this.spawnSmoke(x, y);
      this.breakFlash(x, y);
    }
    this.flash = Math.min(0.7, this.flash + amount);
    this.flashX = x;
    this.flashY = y;
    this.flashHue = hue;
  }

  private explode(x: number, y: number, kind: ShellKind, text?: string, textLife = 4) {
    const [h, sat] = pick(this.palette);
    this.curSat = sat;
    const h2 = Math.random() < 0.45 ? h + pick([-40, -25, 25, 40]) : h;
    this.flashAt(x, y, h, 0.6);
    this.onBurst?.({ double: DOUBLE_KINDS.includes(kind), y01: y / this.h });

    switch (kind) {
      case "peony":
        this.burst(x, y, { count: 190, speed: 300, life: 1.9, drag: 0.975, g: 45, h, h2 });
        break;
      case "chrysanthemum":
        this.burst(x, y, { count: 160, speed: 320, life: 2.4, drag: 0.978, g: 45, h, h2, trail: 0.22 });
        break;
      case "willow":
        this.burst(x, y, { count: 120, speed: 250, life: 3.6, drag: 0.968, g: 75, h: 40, h2: 22, sat: 100, trail: 0.5, size: 1.5 });
        break;
      case "ring":
        this.burst(x, y, { count: 110, speed: 260, life: 1.9, drag: 0.976, g: 40, h, h2, shape: "ring" });
        break;
      case "palm":
        this.burst(x, y, { count: 120, speed: 380, life: 2.6, drag: 0.972, g: 55, h: 42, h2: 18, sat: 100, trail: 0.7, shape: "palm" });
        break;
      case "crackle":
        this.burst(x, y, { count: 200, speed: 285, life: 2.0, drag: 0.974, g: 42, h: 48, h2: 30, sat: 100, glitter: true, size: 1.3 });
        break;
      case "crossette":
        this.burst(x, y, { count: 16, speed: 260, life: 2.0, drag: 0.978, g: 40, h, h2, size: 2.4, split: 0.8, trail: 0.3 });
        break;
      case "spiral":
        this.burst(x, y, { count: 130, speed: 330, life: 2.2, drag: 0.976, g: 38, h, h2, shape: "spiral" });
        break;
      case "pistil":
        this.burst(x, y, { count: 140, speed: 300, life: 2.0, drag: 0.976, g: 42, h, h2 });
        this.burst(x, y, { count: 70, speed: 130, life: 1.7, drag: 0.972, g: 38, h: h + pick([120, 150, 180, 210]), h2: h + 150, sat: 100, size: 2.0 });
        break;
      case "saturn":
        this.burst(x, y, { count: 90, speed: 190, life: 2.0, drag: 0.976, g: 40, h, h2 });
        this.burst(x, y, { count: 100, speed: 340, life: 2.0, drag: 0.976, g: 40, h: h + 60, h2: h + 60, sat: 100, shape: "ring" });
        break;
      case "horsetail":
        this.burst(x, y, { count: 95, speed: 300, life: 3.2, drag: 0.972, g: 65, h: 40, h2: 20, sat: 100, trail: 0.9, shape: "cone", size: 1.5 });
        break;
      case "kamuro": {
        const [fh, fs] = this.familyColour();
        this.burst(x, y, { count: 180, speed: 300, life: 4.8, drag: 0.972, g: 82, h: fh, h2: fh - 18, sat: fs, trail: 0.85, size: 1.5 });
        break;
      }
      case "serpent":
        this.burst(x, y, { count: 46, speed: 220, life: 2.4, drag: 0.978, g: 30, h, h2, size: 2.0, wob: 12, trail: 0.4 });
        break;
      case "comet":
        this.burst(x, y, { count: 14, speed: 210, life: 2.7, drag: 0.985, g: 26, h, h2, size: 2.8, trail: 1.3 });
        break;
      case "strobe":
        this.burst(x, y, { count: 150, speed: 260, life: 2.8, drag: 0.976, g: 36, h: 210, h2: 200, sat: 10, size: 1.9, blink: 16 });
        break;
      case "brocade": {
        const [fh, fs] = this.familyColour();
        this.burst(x, y, { count: 200, speed: 290, life: 3.8, drag: 0.97, g: 72, h: fh, h2: fh - 14, sat: fs, trail: 0.7, glitter: true });
        break;
      }
      case "silver":
        this.burst(x, y, { count: 190, speed: 280, life: 4.4, drag: 0.968, g: 80, h: 210, h2: 200, sat: 12, trail: 0.9, glitter: true, size: 1.6 });
        break;
      case "tripistil": {
        const [ih] = pick(this.palette);
        this.burst(x, y, { count: 150, speed: 300, life: 2.0, drag: 0.976, g: 42, h, h2 });
        this.burst(x, y, { count: 90, speed: 195, life: 1.9, drag: 0.974, g: 40, h: ih + 120, h2: ih + 120, sat: 100, size: 2.0 });
        this.burst(x, y, { count: 50, speed: 95, life: 1.7, drag: 0.972, g: 36, h: 48, h2: 40, sat: 14, size: 2.2 });
        break;
      }
      case "colorchange": {
        const to = h + pick([100, 140, 200]);
        this.burst(x, y, { count: 190, speed: 300, life: 2.7, drag: 0.976, g: 42, h, h2: to, sw: 0.5 });
        break;
      }
      case "chryscrackle":
        this.burst(x, y, { count: 150, speed: 320, life: 2.4, drag: 0.978, g: 45, h, h2, trail: 0.22 });
        this.burst(x, y, { count: 90, speed: 170, life: 2.1, drag: 0.974, g: 40, h: 48, h2: 44, sat: 70, glitter: true, size: 1.3 });
        break;
      case "dahlia":
        this.burst(x, y, { count: 150, speed: 300, life: 2.2, drag: 0.975, g: 38, h, h2, shape: "rose" });
        break;
      case "twocolor":
        this.burst(x, y, { count: 190, speed: 300, life: 2.0, drag: 0.975, g: 45, h, h2: h, hAlt: h + 150 });
        break;
      case "text":
        if (text) this.textBurst(x, y, text, textLife);
        break;
      case "triple":
        this.burst(x, y, { count: 110, speed: 270, life: 1.8, drag: 0.975, g: 45, h, h2 });
        for (const [delay, k] of [[0.28, 1], [0.56, 2]] as const) {
          this.delayed.push({
            t: delay,
            fn: () => {
              const nx = x + rand(-70, 70) * k;
              const ny = y + rand(-45, 45);
              const nh = h + 60 * k;
              this.flashAt(nx, ny, nh, 0.45);
              this.onBurst?.({ double: true, y01: ny / this.h });
              this.burst(nx, ny, { count: 100, speed: 250, life: 1.7, drag: 0.975, g: 45, h: nh, h2: nh });
            },
          });
        }
        break;
      case "double":
        this.burst(x, y, { count: 140, speed: 290, life: 1.9, drag: 0.975, g: 45, h, h2 });
        this.delayed.push({
          t: 0.42,
          fn: () => {
            const nx = x + rand(-50, 50);
            const ny = y + rand(-35, 35);
            const nh = h + pick([50, 90, 180]);
            this.flashAt(nx, ny, nh, 0.5);
            this.onBurst?.({ double: true, y01: ny / this.h });
            this.burst(nx, ny, { count: 130, speed: 260, life: 1.8, drag: 0.975, g: 45, h: nh, h2: nh });
          },
        });
        break;
    }
  }
}
