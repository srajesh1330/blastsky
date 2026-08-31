"use client";

import { useCallback, useEffect, useRef } from "react";

export type FireworksMode = "auto" | "manual";

type FireworksCanvasProps = {
  active: boolean;
  duration: number;
  mode: FireworksMode;
  onFinished: () => void;
};

type Rocket = {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  hue: number;
  trail: { x: number; y: number }[];
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  hue: number;
  size: number;
  gravity: number;
  sparkle: boolean;
};

const BOOM_SOUND = "/sounds/fireworks/boom1.mp3";

const MAX_PARTICLES = 1100;
const MAX_ROCKETS_AUTO = 5;
const MAX_ROCKETS_MANUAL = 8;
const MAX_AUDIO = 8;

const HUES = [
  0,
  25,
  45,
  60,
  120,
  180,
  200,
  220,
  280,
  320,
];

let sharedAudio: HTMLAudioElement | null = null;
let audioUnlocked = false;

/**
 * Unlock the fireworks sound after a real user interaction.
 *
 * IMPORTANT:
 * This must be called from a button/tap/pointer event.
 */
export function unlockFireworksAudio(): void {
  if (typeof window === "undefined") return;

  try {
    if (!sharedAudio) {
      sharedAudio = new Audio(BOOM_SOUND);
      sharedAudio.preload = "auto";
      sharedAudio.volume = 0.85;
    }

    sharedAudio
      .play()
      .then(() => {
        sharedAudio?.pause();

        if (sharedAudio) {
          sharedAudio.currentTime = 0;
        }

        audioUnlocked = true;
      })
      .catch(() => {
        /*
         * Some browsers may reject the silent unlock.
         * Actual explosion sounds can still be attempted
         * after the next user interaction.
         */
      });
  } catch {
    // Ignore audio initialization errors.
  }
}

function playBoom(): void {
  if (typeof window === "undefined") return;

  try {
    const audio = new Audio(BOOM_SOUND);

    audio.preload = "auto";
    audio.volume = audioUnlocked ? 0.85 : 0.75;

    const activeAudio =
      document.querySelectorAll<HTMLAudioElement>(
        "audio[data-fireworks-boom='true']",
      );

    if (activeAudio.length >= MAX_AUDIO) {
      return;
    }

    audio.dataset.fireworksBoom = "true";

    audio.play().catch(() => {
      // Browser may block sound until another user interaction.
    });

    audio.addEventListener(
      "ended",
      () => {
        audio.remove();
      },
      { once: true },
    );
  } catch {
    // Ignore audio errors.
  }
}

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max + 1));
}

function randomHue(): number {
  return HUES[randomInt(0, HUES.length - 1)];
}

function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  return Math.hypot(x2 - x1, y2 - y1);
}

export default function FireworksCanvas({
  active,
  duration,
  mode,
  onFinished,
}: FireworksCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastAutoLaunchRef = useRef<number>(0);

  const widthRef = useRef(0);
  const heightRef = useRef(0);

  const finishedRef = useRef(false);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const width = window.innerWidth;
    const height = window.innerHeight;

    widthRef.current = width;
    heightRef.current = height;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const addParticle = useCallback(
    (
      x: number,
      y: number,
      vx: number,
      vy: number,
      hue: number,
      options?: Partial<Particle>,
    ) => {
      if (particlesRef.current.length >= MAX_PARTICLES) {
        particlesRef.current.splice(
          0,
          Math.min(120, particlesRef.current.length),
        );
      }

      particlesRef.current.push({
        x,
        y,
        vx,
        vy,
        alpha: options?.alpha ?? 1,
        decay: options?.decay ?? random(0.012, 0.022),
        hue,
        size: options?.size ?? random(1, 2.4),
        gravity: options?.gravity ?? 0.045,
        sparkle: options?.sparkle ?? false,
      });
    },
    [],
  );

  const explodeRound = useCallback(
    (x: number, y: number, hue: number) => {
      const count = randomInt(55, 85);

      for (let i = 0; i < count; i++) {
        const angle = random(0, Math.PI * 2);
        const speed = random(1.5, 6.2);

        addParticle(
          x,
          y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          hue + random(-10, 10),
          {
            decay: random(0.012, 0.021),
            gravity: 0.045,
            size: random(1, 2.2),
            sparkle: Math.random() > 0.65,
          },
        );
      }
    },
    [addParticle],
  );

  const explodeRing = useCallback(
    (x: number, y: number, hue: number) => {
      const count = 70;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = random(3.5, 5.2);

        addParticle(
          x,
          y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          hue,
          {
            decay: random(0.013, 0.019),
            size: random(1.2, 2.2),
            gravity: 0.035,
          },
        );
      }
    },
    [addParticle],
  );

  const explodeWillow = useCallback(
    (x: number, y: number, hue: number) => {
      const count = 75;

      for (let i = 0; i < count; i++) {
        const angle = random(0, Math.PI * 2);
        const speed = random(2, 5);

        addParticle(
          x,
          y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          hue,
          {
            decay: random(0.006, 0.012),
            gravity: 0.075,
            size: random(1, 2),
            sparkle: true,
          },
        );
      }
    },
    [addParticle],
  );

  const explodeGlitter = useCallback(
    (x: number, y: number, hue: number) => {
      const count = 95;

      for (let i = 0; i < count; i++) {
        const angle = random(0, Math.PI * 2);
        const speed = random(1.5, 6);

        addParticle(
          x,
          y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          hue + random(-30, 30),
          {
            decay: random(0.015, 0.028),
            size: random(0.8, 2.5),
            gravity: 0.04,
            sparkle: true,
          },
        );
      }
    },
    [addParticle],
  );

  const explodeSpiral = useCallback(
    (x: number, y: number, hue: number) => {
      const count = 90;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 8;
        const speed = 1.5 + (i / count) * 4;

        addParticle(
          x,
          y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          hue,
          {
            decay: random(0.013, 0.021),
            size: random(1, 2),
            gravity: 0.04,
          },
        );
      }
    },
    [addParticle],
  );

  const explodeDouble = useCallback(
    (x: number, y: number, hue: number) => {
      explodeRound(x, y, hue);

      setTimeout(() => {
        if (!finishedRef.current) {
          explodeRing(x, y, hue + 35);
        }
      }, 120);
    },
    [explodeRing, explodeRound],
  );

  const explode = useCallback(
    (x: number, y: number, hue: number) => {
      playBoom();

      const pattern = randomInt(0, 5);

      switch (pattern) {
        case 0:
          explodeRound(x, y, hue);
          break;
        case 1:
          explodeRing(x, y, hue);
          break;
        case 2:
          explodeWillow(x, y, hue);
          break;
        case 3:
          explodeGlitter(x, y, hue);
          break;
        case 4:
          explodeSpiral(x, y, hue);
          break;
        default:
          explodeDouble(x, y, hue);
          break;
      }
    },
    [
      explodeDouble,
      explodeGlitter,
      explodeRing,
      explodeRound,
      explodeSpiral,
      explodeWillow,
    ],
  );

  const launchRocket = useCallback(
    (targetX: number, targetY?: number) => {
      const width = widthRef.current;
      const height = heightRef.current;

      if (!width || !height) return;

      const limit =
        mode === "auto"
          ? MAX_ROCKETS_AUTO
          : MAX_ROCKETS_MANUAL;

      if (rocketsRef.current.length >= limit) {
        return;
      }

      const x = random(width * 0.12, width * 0.88);

      const rocketTargetY =
        targetY ??
        random(height * 0.12, height * 0.55);

      rocketsRef.current.push({
        x,
        y: height + 8,
        targetY: Math.max(80, rocketTargetY),
        speed: random(7, 10),
        hue: randomHue(),
        trail: [],
      });

      if (typeof targetX === "number") {
        const rocket = rocketsRef.current[
          rocketsRef.current.length - 1
        ];

        rocket.x = targetX;
      }
    },
    [mode],
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent) => {
      if (!active || mode !== "manual") return;

      unlockFireworksAudio();

      const canvas = canvasRef.current;

      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      launchRocket(x, y);
    },
    [active, launchRocket, mode],
  );

  useEffect(() => {
    if (!active) return;

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [active, resizeCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !active) return;

    canvas.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      canvas.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, [active, handlePointerDown]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    finishedRef.current = false;

    rocketsRef.current = [];
    particlesRef.current = [];

    startTimeRef.current = performance.now();
    lastAutoLaunchRef.current = 0;

    const durationMs =
      Math.max(1, duration) * 60 * 1000;

    const drawBackground = () => {
      const width = widthRef.current;
      const height = heightRef.current;

      ctx.fillStyle = "#02040b";
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        height,
      );

      gradient.addColorStop(0, "#02040b");
      gradient.addColorStop(0.65, "#050817");
      gradient.addColorStop(1, "#02030a");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(255,255,255,0.65)";

      const stars = [
        [0.08, 0.12],
        [0.18, 0.25],
        [0.29, 0.09],
        [0.39, 0.18],
        [0.51, 0.11],
        [0.64, 0.22],
        [0.73, 0.08],
        [0.84, 0.28],
        [0.94, 0.12],
        [0.14, 0.43],
        [0.77, 0.46],
      ];

      for (const [sx, sy] of stars) {
        ctx.fillRect(
          width * sx,
          height * sy,
          1,
          1,
        );
      }
    };

    const frame = (now: number) => {
      if (finishedRef.current) return;

      const elapsed =
        now - startTimeRef.current;

      drawBackground();

      /*
       * AUTO MODE
       */
      if (mode === "auto") {
        const interval =
          elapsed < 10000
            ? 850
            : elapsed < 30000
              ? 1100
              : 1400;

        if (
          now - lastAutoLaunchRef.current >
          interval
        ) {
          lastAutoLaunchRef.current = now;

          launchRocket(
            random(
              widthRef.current * 0.15,
              widthRef.current * 0.85,
            ),
            random(
              heightRef.current * 0.12,
              heightRef.current * 0.52,
            ),
          );
        }
      }

      /*
       * ROCKETS
       */
      const rockets = rocketsRef.current;

      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];

        rocket.trail.push({
          x: rocket.x,
          y: rocket.y,
        });

        if (rocket.trail.length > 7) {
          rocket.trail.shift();
        }

        rocket.y -= rocket.speed;

        ctx.beginPath();
        ctx.moveTo(
          rocket.x,
          rocket.y + 10,
        );

        ctx.lineTo(
          rocket.x,
          rocket.y + 22,
        );

        ctx.strokeStyle =
          `hsla(${rocket.hue}, 100%, 75%, 0.75)`;

        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle =
          `hsl(${rocket.hue}, 100%, 80%)`;

        ctx.beginPath();
        ctx.arc(
          rocket.x,
          rocket.y,
          2,
          0,
          Math.PI * 2,
        );

        ctx.fill();

        if (rocket.y <= rocket.targetY) {
          explode(
            rocket.x,
            rocket.y,
            rocket.hue,
          );

          rockets.splice(i, 1);
        }
      }

      /*
       * PARTICLES
       */
      const particles =
        particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.985;
        p.vy *= 0.985;

        p.vy += p.gravity;

        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        if (
          p.x < -50 ||
          p.x > widthRef.current + 50 ||
          p.y > heightRef.current + 80
        ) {
          particles.splice(i, 1);
          continue;
        }

        const light =
          p.sparkle && Math.random() > 0.75
            ? 100
            : 70;

        ctx.fillStyle =
          `hsla(${p.hue}, 100%, ${light}%, ${p.alpha})`;

        ctx.beginPath();

        ctx.arc(
          p.x,
          p.y,
          p.size,
          0,
          Math.PI * 2,
        );

        ctx.fill();

        if (p.sparkle && p.alpha > 0.3) {
          ctx.fillStyle =
            `rgba(255,255,255,${p.alpha * 0.65})`;

          ctx.fillRect(
            p.x,
            p.y,
            0.8,
            0.8,
          );
        }
      }

      /*
       * FINISH
       */
      if (
        mode === "auto" &&
        elapsed >= durationMs
      ) {
        finishedRef.current = true;

        rocketsRef.current = [];

        window.setTimeout(() => {
          particlesRef.current = [];
          onFinished();
        }, 1800);

        return;
      }

      animationRef.current =
        requestAnimationFrame(frame);
    };

    animationRef.current =
      requestAnimationFrame(frame);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(
          animationRef.current,
        );
      }

      animationRef.current = null;
    };
  }, [
    active,
    duration,
    explode,
    launchRocket,
    mode,
    onFinished,
    resizeCanvas,
  ]);

  return (
    <main className="fixed inset-0 z-50 overflow-hidden bg-[#02040b]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between p-4 sm:p-6">
        <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-bold text-white/75 backdrop-blur-xl">
          🎆 BlastSky
        </div>

        <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-semibold text-white/55 backdrop-blur-xl">
          {mode === "manual"
            ? "Manual Mode"
            : `Auto • ${duration} min`}
        </div>
      </div>

      <button
        type="button"
        onClick={onFinished}
        className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-black/55 px-6 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
      >
        ← Go Back
      </button>
    </main>
  );
}