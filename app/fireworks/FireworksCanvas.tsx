"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type FireworksMode = "auto" | "manual";

interface FireworksCanvasProps {
  active: boolean;
  duration: number;
  mode: FireworksMode;
  onFinished: () => void;
}

type FireworkCategory =
  | "india"
  | "usa"
  | "china"
  | "all";

type FireworkType =
  | "random"
  | "peony"
  | "chrysanthemum"
  | "ring"
  | "willow"
  | "palm"
  | "spiral"
  | "star"
  | "glitter"
  | "crackle"
  | "crossette"
  | "brocade"
  | "horsetail"
  | "waterfall"
  | "dahlia"
  | "kamuro"
  | "saturn"
  | "double-ring"
  | "triple-ring"
  | "burst"
  | "comet"
  | "salute"
  | "multi-break"
  | "finale";

type ColorMode =
  | "random"
  | "rainbow"
  | "red"
  | "blue"
  | "green"
  | "gold"
  | "purple"
  | "white"
  | "orange"
  | "pink";

type FireworkSize =
  | "small"
  | "normal"
  | "big"
  | "giant";

type Intensity =
  | "low"
  | "normal"
  | "high"
  | "extreme";

type SoundMode =
  | "auto"
  | "boom1"
  | "boom2"
  | "off";

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;

  targetX: number;
  targetY: number;

  hue: number;

  trail: TrailPoint[];

  special: boolean;

  category: FireworkCategory;

  age: number;

  maxAge: number;

  style: FireworkType;
}

interface Particle {
  x: number;
  y: number;

  vx: number;
  vy: number;

  life: number;
  maxLife: number;

  size: number;

  hue: number;

  alpha: number;

  gravity: number;

  friction: number;

  drag: number;

  style: number;

  spin: number;

  twinkle: number;

  glow: number;

  secondary: boolean;
}

interface SecondaryBurst {
  x: number;
  y: number;

  delay: number;

  age: number;

  hue: number;

  type: FireworkType;

  radius: number;
}

/*
=========================================================
SOUNDS
=========================================================
*/

const NORMAL_SOUND =
  "/sounds/fireworks/Boom1.mp3";

const SPECIAL_SOUND =
  "/sounds/fireworks/Boom2.mp3";

/*
 * Launch sound intentionally removed.
 */

/*
=========================================================
PERFORMANCE LIMITS
=========================================================
*/

const MAX_PARTICLES = 1250;

const MAX_ROCKETS = 5;

const MAX_SECONDARY_BURSTS = 18;

const MAX_DPR = 1.15;

const AUDIO_POOL_SIZE = 3;

/*
=========================================================
COLOR HUES
=========================================================
*/

const COLOR_HUES: Record<
  Exclude<ColorMode, "random" | "rainbow">,
  number
> = {
  red: 0,
  blue: 215,
  green: 120,
  gold: 45,
  purple: 275,
  white: 0,
  orange: 25,
  pink: 330,
};



// -----------------------------------------------------------------------------
// GLOBAL FIREWORKS AUDIO
// -----------------------------------------------------------------------------
// Browsers block script-started audible playback until the visitor interacts
// with the page. The Start BlastSky button calls unlockFireworksAudio() during
// that user gesture, then the canvas can play Boom1/Boom2 later from buffers.

type FireworksSoundName = "boom1" | "boom2";

let fireworksAudioContext: AudioContext | null = null;
let fireworksAudioBuffers: Partial<Record<FireworksSoundName, AudioBuffer>> = {};
let fireworksAudioLoading: Promise<void> | null = null;
let fireworksAudioUnlocked = false;

const fireworksFallbackPools: Record<FireworksSoundName, HTMLAudioElement[]> = {
  boom1: [],
  boom2: [],
};

const fireworksFallbackIndexes: Record<FireworksSoundName, number> = {
  boom1: 0,
  boom2: 0,
};

function getFireworksAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (fireworksAudioContext) return fireworksAudioContext;

  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextClass) return null;

  fireworksAudioContext = new AudioContextClass();
  return fireworksAudioContext;
}

function createFallbackPool(
  sound: FireworksSoundName,
  src: string
) {
  if (fireworksFallbackPools[sound].length > 0) return;

  for (let i = 0; i < AUDIO_POOL_SIZE; i++) {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    audio.volume = sound === "boom2" ? 0.82 : 0.62;
    fireworksFallbackPools[sound].push(audio);
  }
}

export async function unlockFireworksAudio(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const context = getFireworksAudioContext();

  // Always prepare the HTMLAudio fallback as well.
  createFallbackPool("boom1", NORMAL_SOUND);
  createFallbackPool("boom2", SPECIAL_SOUND);

  if (!context) {
    fireworksAudioUnlocked = true;
    return true;
  }

  try {
    // IMPORTANT: resume() is called from the actual Start/Click gesture.
    await context.resume();
    fireworksAudioUnlocked = context.state === "running";
  } catch {
    fireworksAudioUnlocked = false;
  }

  if (!fireworksAudioLoading) {
    fireworksAudioLoading = (async () => {
      const entries: Array<[FireworksSoundName, string]> = [
        ["boom1", NORMAL_SOUND],
        ["boom2", SPECIAL_SOUND],
      ];

      for (const [name, src] of entries) {
        try {
          const response = await fetch(src, { cache: "force-cache" });
          if (!response.ok) continue;

          const arrayBuffer = await response.arrayBuffer();
          const decoded = await context.decodeAudioData(arrayBuffer);
          fireworksAudioBuffers[name] = decoded;
        } catch {
          // HTMLAudio fallback will be used if decoding fails.
        }
      }
    })();
  }

  try {
    await fireworksAudioLoading;
  } catch {
    // Keep fallback audio available.
  }

  return fireworksAudioUnlocked;
}

function playFireworksSound(
  sound: FireworksSoundName,
  volume: number
) {
  if (!fireworksAudioUnlocked) return;

  const context = fireworksAudioContext;
  const buffer = fireworksAudioBuffers[sound];

  if (context && buffer && context.state === "running") {
    try {
      const source = context.createBufferSource();
      const gain = context.createGain();
      source.buffer = buffer;
      gain.gain.value = volume;
      source.connect(gain);
      gain.connect(context.destination);
      source.start(0);
      return;
    } catch {
      // Use HTMLAudio fallback below.
    }
  }

  const pool = fireworksFallbackPools[sound];
  if (!pool.length) return;

  const index = fireworksFallbackIndexes[sound] % pool.length;
  fireworksFallbackIndexes[sound] += 1;

  const audio = pool[index];

  try {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;
    void audio.play().catch(() => {});
  } catch {
    // Ignore playback errors.
  }
}

const RANDOM_HUES = [
  0,
  18,
  32,
  45,
  120,
  175,
  195,
  215,
  275,
  315,
  335,
];

/*
=========================================================
UTILITIES
=========================================================
*/

function random(
  min: number,
  max: number
): number {
  return (
    Math.random() *
      (max - min) +
    min
  );
}

function randomInt(
  min: number,
  max: number
): number {
  return Math.floor(
    random(min, max + 1)
  );
}

function normalizeHue(
  hue: number
): number {
  return (
    ((hue % 360) + 360) %
    360
  );
}

function randomHue(): number {
  return RANDOM_HUES[
    randomInt(
      0,
      RANDOM_HUES.length - 1
    )
  ];
}

function sizeMultiplier(
  size: FireworkSize
): number {
  switch (size) {
    case "small":
      return 0.7;

    case "big":
      return 1.25;

    case "giant":
      return 1.48;

    default:
      return 1;
  }
}

function intensityMultiplier(
  intensity: Intensity
): number {
  switch (intensity) {
    case "low":
      return 0.62;

    case "high":
      return 1.18;

    case "extreme":
      return 1.42;

    default:
      return 1;
  }
}

function categoryTypes(
  category: FireworkCategory
): FireworkType[] {
  if (category === "india") {
    return [
      "peony",
      "chrysanthemum",
      "willow",
      "glitter",
      "crackle",
      "crossette",
      "brocade",
      "dahlia",
      "waterfall",
      "multi-break",
    ];
  }

  if (category === "usa") {
    return [
      "peony",
      "ring",
      "double-ring",
      "triple-ring",
      "star",
      "saturn",
      "salute",
      "burst",
      "comet",
      "finale",
    ];
  }

  if (category === "china") {
    return [
      "willow",
      "palm",
      "spiral",
      "glitter",
      "horsetail",
      "kamuro",
      "brocade",
      "crackle",
      "multi-break",
      "chrysanthemum",
    ];
  }

  return [
    "peony",
    "chrysanthemum",
    "ring",
    "willow",
    "palm",
    "spiral",
    "star",
    "glitter",
    "crackle",
    "crossette",
    "brocade",
    "horsetail",
    "waterfall",
    "dahlia",
    "kamuro",
    "saturn",
    "double-ring",
    "triple-ring",
    "burst",
    "comet",
    "salute",
    "multi-break",
    "finale",
  ];
}

/*
=========================================================
COMPONENT
=========================================================
*/

export default function FireworksCanvas({
  active,
  duration,
  mode,
  onFinished,
}: FireworksCanvasProps) {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const animationRef =
    useRef<number | null>(null);

  const rocketsRef =
    useRef<Rocket[]>([]);

  const particlesRef =
    useRef<Particle[]>([]);

  const secondaryRef =
    useRef<SecondaryBurst[]>([]);

  const startTimeRef =
    useRef(0);

  const lastTimeRef =
    useRef(0);

  const lastLaunchRef =
    useRef(0);

  const lastFrameRef =
    useRef(0);

  const fpsRef =
    useRef(60);

  const qualityRef =
    useRef(1);

  const nextSpecialRef =
    useRef(false);

  const settingsRef =
    useRef({
      category:
        "all" as FireworkCategory,

      type:
        "random" as FireworkType,

      color:
        "random" as ColorMode,

      size:
        "normal" as FireworkSize,

      intensity:
        "normal" as Intensity,

      sound:
        "auto" as SoundMode,

      muted: false,

      paused: false,

      finale: false,
    });

  const [category, setCategory] =
    useState<FireworkCategory>(
      "all"
    );

  const [fireworkType, setFireworkType] =
    useState<FireworkType>(
      "random"
    );

  const [colorMode, setColorMode] =
    useState<ColorMode>(
      "random"
    );

  const [fireworkSize, setFireworkSize] =
    useState<FireworkSize>(
      "normal"
    );

  const [intensity, setIntensity] =
    useState<Intensity>(
      "normal"
    );

  const [soundMode, setSoundMode] =
    useState<SoundMode>(
      "auto"
    );

  const [muted, setMuted] =
    useState(false);

  const [paused, setPaused] =
    useState(false);

  const [finale, setFinale] =
    useState(false);

  const [showControls, setShowControls] =
    useState(true);

  const [isFullscreen, setIsFullscreen] =
    useState(false);

  /*
=========================================================
SYNC SETTINGS
=========================================================
*/

  useEffect(() => {
    settingsRef.current.category =
      category;

    settingsRef.current.type =
      fireworkType;

    settingsRef.current.color =
      colorMode;

    settingsRef.current.size =
      fireworkSize;

    settingsRef.current.intensity =
      intensity;

    settingsRef.current.sound =
      soundMode;

    settingsRef.current.muted =
      muted;

    settingsRef.current.paused =
      paused;

    settingsRef.current.finale =
      finale;
  }, [
    category,
    fireworkType,
    colorMode,
    fireworkSize,
    intensity,
    soundMode,
    muted,
    paused,
    finale,
  ]);

  /*
=========================================================
FULLSCREEN
=========================================================
*/

  const toggleFullscreen =
    useCallback(async () => {
      const element =
        containerRef.current;

      if (!element) return;

      try {
        if (
          document.fullscreenElement
        ) {
          await document.exitFullscreen();
        } else {
          await element.requestFullscreen();
        }
      } catch {
        // Ignore fullscreen errors.
      }
    }, []);

  useEffect(() => {
    const handleFullscreen =
      () => {
        setIsFullscreen(
          document.fullscreenElement ===
            containerRef.current
        );
      };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreen
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreen
      );
    };
  }, []);

  /*
=========================================================
MAIN ENGINE
=========================================================
*/

  useEffect(() => {
    if (!active) {
      return;
    }

    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      });

    if (!ctx) {
      return;
    }

    let stopped = false;

    let width = 1;

    let height = 1;

    let dpr = 1;

    /*
=========================================================
RESIZE
=========================================================
*/

    const resize = () => {
      const rect =
        canvas.getBoundingClientRect();

      width = Math.max(
        1,
        rect.width
      );

      height = Math.max(
        1,
        rect.height
      );

      dpr = Math.min(
        window.devicePixelRatio || 1,
        MAX_DPR
      );

      canvas.width =
        Math.floor(width * dpr);

      canvas.height =
        Math.floor(height * dpr);

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    resize();

    let resizeTimer:
      ReturnType<typeof setTimeout> | null =
      null;

    const handleResize = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }

      resizeTimer = setTimeout(
        resize,
        80
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    /*
=========================================================
AUDIO
=========================================================
*/

    // Audio is unlocked by the page-level Start button.
    // Manual canvas clicks also attempt an unlock when needed.
    const unlockAudio = () => {
      void unlockFireworksAudio();
    };

    const playExplosionSound = (special: boolean) => {
      const sound = settingsRef.current.sound;

      if (sound === "off") return;

      if (sound === "boom1") {
        playFireworksSound("boom1", 0.62);
        return;
      }

      if (sound === "boom2") {
        playFireworksSound("boom2", 0.82);
        return;
      }

      playFireworksSound(
        special ? "boom2" : "boom1",
        special ? 0.82 : 0.62
      );
    };

    window.addEventListener(
      "pointerdown",
      unlockAudio,
      { passive: true }
    );

    window.addEventListener(
      "keydown",
      unlockAudio,
      { passive: true }
    );

    const addParticle = (
      particle: Particle
    ) => {
      const limit =
        Math.floor(
          MAX_PARTICLES *
            qualityRef.current
        );

      if (
        particlesRef.current.length >=
        limit
      ) {
        particlesRef.current.splice(
          0,
          Math.min(
            50,
            particlesRef.current.length
          )
        );
      }

      particlesRef.current.push(
        particle
      );
    };

    const createParticle = (
      x: number,
      y: number,
      angle: number,
      speed: number,
      hue: number,
      options: Partial<Particle> = {}
    ) => {
      addParticle({
        x,
        y,

        vx:
          Math.cos(angle) *
          speed,

        vy:
          Math.sin(angle) *
          speed,

        life: 0,

        maxLife: random(
          65,
          120
        ),

        size: random(
          0.8,
          1.8
        ),

        hue:
          normalizeHue(
            hue +
              random(
                -7,
                7
              )
          ),

        alpha: 1,

        gravity: 0.045,

        friction: 0.985,

        drag: 1,

        style: 0,

        spin: 0,

        twinkle: random(
          0.4,
          1
        ),

        glow: random(
          0.25,
          0.8
        ),

        secondary: false,

        ...options,
      });
    };

    /*
=========================================================
COLOR
=========================================================
*/

    const getHue = () => {
      const color =
        settingsRef.current.color;

      if (
        color === "rainbow"
      ) {
        return random(
          0,
          360
        );
      }

      if (
        color === "random"
      ) {
        return randomHue();
      }

      return COLOR_HUES[color];
    };

    /*
=========================================================
PARTICLE COUNTS
=========================================================
*/

    const particleCount = (
      base: number
    ) => {
      const multiplier =
        sizeMultiplier(
          settingsRef.current.size
        ) *
        intensityMultiplier(
          settingsRef.current.intensity
        ) *
        qualityRef.current;

      return Math.floor(
        base * multiplier
      );
    };

    /*
=========================================================
REALISTIC PEONY
=========================================================
*/

    const peony = (
      x: number,
      y: number,
      hue: number,
      special: boolean
    ) => {
      const count =
        particleCount(
          special
            ? 110
            : 78
        );

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const angle =
          (Math.PI * 2 * i) /
            count +
          random(
            -0.035,
            0.035
          );

        const speed =
          random(
            special
              ? 3.0
              : 2.5,
            special
              ? 5.6
              : 4.6
          );

        createParticle(
          x,
          y,
          angle,
          speed,
          hue +
            random(
              -10,
              22
            ),
          {
            maxLife: random(
              70,
              special
                ? 140
                : 115
            ),

            gravity: random(
              0.035,
              0.06
            ),

            friction: random(
              0.982,
              0.99
            ),

            size: random(
              0.8,
              special
                ? 2.25
                : 1.8
            ),

            style: 0,

            glow: random(
              0.4,
              0.9
            ),
          }
        );
      }

      if (special) {
        for (
          let i = 0;
          i < 28;
          i++
        ) {
          createParticle(
            x,
            y,
            random(
              0,
              Math.PI * 2
            ),
            random(
              0.8,
              2.2
            ),
            hue + 55,
            {
              maxLife: random(
                35,
                75
              ),
              gravity: 0.035,
              friction: 0.97,
              size: random(
                0.7,
                1.4
              ),
              style: 3,
            }
          );
        }
      }
    };

    /*
=========================================================
CHRYSANTHEMUM
=========================================================
*/

    const chrysanthemum = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        particleCount(105);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const angle =
          (Math.PI * 2 * i) /
          count;

        const speed =
          random(
            2.5,
            4.8
          );

        createParticle(
          x,
          y,
          angle,
          speed,
          hue +
            Math.sin(i * 0.4) *
              20,
          {
            maxLife: random(
              85,
              130
            ),
            gravity: 0.048,
            friction: 0.988,
            size: random(
              0.8,
              1.7
            ),
          }
        );
      }
    };

    /*
=========================================================
RING
=========================================================
*/

    const ring = (
      x: number,
      y: number,
      hue: number,
      rings = 1
    ) => {
      const count =
        particleCount(
          68
        );

      for (
        let r = 0;
        r < rings;
        r++
      ) {
        const ringHue =
          hue +
          r * 48;

        for (
          let i = 0;
          i < count;
          i++
        ) {
          const angle =
            (Math.PI * 2 * i) /
            count;

          createParticle(
            x,
            y,
            angle,
            2.9 +
              r *
                0.8 +
              random(
                -0.15,
                0.15
              ),
            ringHue,
            {
              maxLife: random(
                75,
                120
              ),
              gravity: 0.025,
              friction: 0.99,
              size: random(
                0.9,
                1.8
              ),
              style: 1,
            }
          );
        }
      }
    };

    /*
=========================================================
WILLOW
=========================================================
*/

    const willow = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        particleCount(82);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const angle =
          (Math.PI * 2 * i) /
            count +
          random(
            -0.08,
            0.08
          );

        createParticle(
          x,
          y,
          angle,
          random(
            2.0,
            4.0
          ),
          hue +
            random(
              -5,
              10
            ),
          {
            maxLife: random(
              105,
              175
            ),

            gravity: random(
              0.07,
              0.105
            ),

            friction: 0.993,

            size: random(
              0.8,
              1.8
            ),

            style: 2,
          }
        );
      }
    };

    /*
=========================================================
PALM
=========================================================
*/

    const palm = (
      x: number,
      y: number,
      hue: number
    ) => {
      const arms =
        randomInt(
          8,
          13
        );

      for (
        let arm = 0;
        arm < arms;
        arm++
      ) {
        const angle =
          -Math.PI / 2 +
          (Math.PI * 2 * arm) /
            arms;

        const count =
          particleCount(22);

        for (
          let i = 0;
          i < count;
          i++
        ) {
          const progress =
            i / count;

          createParticle(
            x,
            y,
            angle +
              random(
                -0.06,
                0.06
              ),
            2.2 +
              progress *
                2.5,
            hue +
              random(
                -8,
                12
              ),
            {
              maxLife: random(
                100,
                165
              ),
              gravity: 0.075,
              friction: 0.993,
              size: random(
                0.8,
                1.7
              ),
              style: 2,
            }
          );
        }
      }
    };

    /*
=========================================================
SPIRAL
=========================================================
*/

    const spiral = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        particleCount(110);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const progress =
          i / count;

        const angle =
          progress *
          Math.PI *
          9;

        createParticle(
          x,
          y,
          angle,
          1.5 +
            progress *
              3.7,
          hue +
            progress *
              190,
          {
            maxLife: random(
              75,
              135
            ),
            gravity: 0.028,
            friction: 0.987,
            style: 4,
            spin: 0.022,
            size: random(
              0.8,
              1.7
            ),
          }
        );
      }
    };

    /*
=========================================================
STAR
=========================================================
*/

    const star = (
      x: number,
      y: number,
      hue: number
    ) => {
      const arms = 5;

      for (
        let arm = 0;
        arm < arms;
        arm++
      ) {
        const angle =
          -Math.PI / 2 +
          (Math.PI * 2 * arm) /
            arms;

        const count =
          particleCount(22);

        for (
          let i = 0;
          i < count;
          i++
        ) {
          createParticle(
            x,
            y,
            angle +
              random(
                -0.035,
                0.035
              ),
            random(
              2.6,
              5.0
            ),
            hue +
              arm *
                18,
            {
              maxLife: random(
                75,
                120
              ),
              gravity: 0.045,
              friction: 0.988,
              style: 3,
              size: random(
                0.9,
                1.8
              ),
            }
          );
        }
      }
    };

    /*
=========================================================
GLITTER
=========================================================
*/

    const glitter = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        particleCount(105);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        createParticle(
          x,
          y,
          random(
            0,
            Math.PI * 2
          ),
          random(
            1.5,
            4.8
          ),
          hue +
            random(
              -45,
              80
            ),
          {
            maxLife: random(
              60,
              125
            ),
            gravity: 0.05,
            friction: 0.983,
            style: 3,
            size: random(
              0.7,
              1.8
            ),
          }
        );
      }
    };

    /*
=========================================================
CRACKLE
=========================================================
*/

    const crackle = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        particleCount(70);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        createParticle(
          x,
          y,
          random(
            0,
            Math.PI * 2
          ),
          random(
            1.4,
            5.0
          ),
          hue +
            random(
              -40,
              90
            ),
          {
            maxLife: random(
              35,
              90
            ),
            gravity: 0.085,
            friction: 0.968,
            size: random(
              0.6,
              1.5
            ),
            style: 3,
          }
        );
      }
    };

    /*
=========================================================
CROSSETTE
=========================================================
*/

    const crossette = (
      x: number,
      y: number,
      hue: number
    ) => {
      const arms =
        randomInt(
          5,
          8
        );

      for (
        let arm = 0;
        arm < arms;
        arm++
      ) {
        const angle =
          (Math.PI * 2 * arm) /
          arms;

        for (
          let i = 0;
          i < 14;
          i++
        ) {
          createParticle(
            x,
            y,
            angle +
              random(
                -0.02,
                0.02
              ),
            random(
              2.5,
              4.8
            ),
            hue,
            {
              maxLife: random(
                55,
                95
              ),
              gravity: 0.045,
              friction: 0.98,
              style: 3,
            }
          );
        }
      }
    };

    /*
=========================================================
BROCADE
=========================================================
*/

    const brocade = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        particleCount(95);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const angle =
          random(
            0,
            Math.PI * 2
          );

        createParticle(
          x,
          y,
          angle,
          random(
            2.1,
            4.5
          ),
          hue,
          {
            maxLife: random(
              105,
              160
            ),
            gravity: 0.08,
            friction: 0.992,
            size: random(
              0.8,
              1.8
            ),
            style: 2,
          }
        );
      }
    };

    /*
=========================================================
HORSETAIL / WATERFALL
=========================================================
*/

    const horsetail = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        particleCount(90);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const angle =
          random(
            Math.PI * 0.15,
            Math.PI * 0.85
          );

        createParticle(
          x,
          y,
          angle,
          random(
            2.2,
            4.3
          ),
          hue,
          {
            maxLife: random(
              115,
              185
            ),
            gravity: 0.09,
            friction: 0.994,
            style: 2,
            size: random(
              0.7,
              1.6
            ),
          }
        );
      }
    };

    /*
=========================================================
DAHLIA
=========================================================
*/

    const dahlia = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        particleCount(120);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const angle =
          (Math.PI * 2 * i) /
          count;

        createParticle(
          x,
          y,
          angle,
          random(
            3.1,
            5.3
          ),
          hue +
            random(
              -18,
              30
            ),
          {
            maxLife: random(
              70,
              120
            ),
            gravity: 0.035,
            friction: 0.989,
            size: random(
              0.8,
              1.9
            ),
          }
        );
      }
    };

    /*
=========================================================
KAMURO
=========================================================
*/

    const kamuro = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        particleCount(105);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const angle =
          random(
            0,
            Math.PI * 2
          );

        createParticle(
          x,
          y,
          angle,
          random(
            2.0,
            4.1
          ),
          42 +
            random(
              -6,
              7
            ),
          {
            maxLife: random(
              130,
              190
            ),
            gravity: 0.095,
            friction: 0.994,
            size: random(
              0.9,
              1.8
            ),
            style: 2,
          }
        );
      }
    };

    /*
=========================================================
SATURN
=========================================================
*/

    const saturn = (
      x: number,
      y: number,
      hue: number
    ) => {
      ring(
        x,
        y,
        hue,
        1
      );

      const count =
        particleCount(55);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const angle =
          random(
            0,
            Math.PI * 2
          );

        createParticle(
          x,
          y,
          angle,
          random(
            1.5,
            3.5
          ),
          hue + 80,
          {
            maxLife: random(
              65,
              100
            ),
            gravity: 0.04,
            friction: 0.985,
            style: 3,
          }
        );
      }
    };

    /*
=========================================================
COMET
=========================================================
*/

    const comet = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        particleCount(75);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const angle =
          random(
            0,
            Math.PI * 2
          );

        createParticle(
          x,
          y,
          angle,
          random(
            1.2,
            3.8
          ),
          hue,
          {
            maxLife: random(
              85,
              145
            ),
            gravity: 0.075,
            friction: 0.991,
            size: random(
              0.7,
              1.8
            ),
          }
        );
      }
    };

    /*
=========================================================
SALUTE
=========================================================
*/

    const salute = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        particleCount(95);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        createParticle(
          x,
          y,
          random(
            0,
            Math.PI * 2
          ),
          random(
            3.8,
            6.2
          ),
          hue,
          {
            maxLife: random(
              35,
              65
            ),
            gravity: 0.035,
            friction: 0.975,
            size: random(
              0.8,
              2
            ),
            style: 3,
          }
        );
      }
    };

    /*
=========================================================
BURST
=========================================================
*/

    const burst = (
      x: number,
      y: number,
      hue: number
    ) => {
      peony(
        x,
        y,
        hue,
        true
      );

      const count =
        particleCount(38);

      for (
        let i = 0;
        i < count;
        i++
      ) {
        createParticle(
          x,
          y,
          random(
            0,
            Math.PI * 2
          ),
          random(
            4,
            6
          ),
          hue + 50,
          {
            maxLife: random(
              30,
              65
            ),
            gravity: 0.045,
            friction: 0.975,
            style: 3,
          }
        );
      }
    };

    /*
=========================================================
SECONDARY BURSTS
=========================================================
*/

    const addSecondary =
      (
        x: number,
        y: number,
        hue: number
      ) => {
        if (
          secondaryRef.current
            .length >=
          MAX_SECONDARY_BURSTS
        ) {
          return;
        }

        secondaryRef.current.push(
          {
            x:
              x +
              random(
                -55,
                55
              ),

            y:
              y +
              random(
                -55,
                55
              ),

            delay: random(
              16,
              40
            ),

            age: 0,

            hue:
              hue +
              random(
                -35,
                55
              ),

            type:
              [
                "glitter",
                "crackle",
                "burst",
                "star",
              ][
                randomInt(
                  0,
                  3
                )
              ] as FireworkType,

            radius: random(
              20,
              45
            ),
          }
        );
      };

    /*
=========================================================
EXPLOSION
=========================================================
*/

    const explode = (
      rocket: Rocket
    ) => {
      const x =
        rocket.x;

      const y =
        rocket.y;

      const hue =
        rocket.hue;

      const special =
        rocket.special;

      playExplosionSound(
        special
      );

      let type =
        rocket.style;

      if (
        type === "random"
      ) {
        const types =
          categoryTypes(
            settingsRef.current
              .category
          );

        type =
          types[
            randomInt(
              0,
              types.length - 1
            )
          ];
      }

      switch (type) {
        case "peony":
          peony(
            x,
            y,
            hue,
            special
          );
          break;

        case "chrysanthemum":
          chrysanthemum(
            x,
            y,
            hue
          );
          break;

        case "ring":
          ring(
            x,
            y,
            hue
          );
          break;

        case "willow":
          willow(
            x,
            y,
            hue
          );
          break;

        case "palm":
          palm(
            x,
            y,
            hue
          );
          break;

        case "spiral":
          spiral(
            x,
            y,
            hue
          );
          break;

        case "star":
          star(
            x,
            y,
            hue
          );
          break;

        case "glitter":
          glitter(
            x,
            y,
            hue
          );
          break;

        case "crackle":
          crackle(
            x,
            y,
            hue
          );
          break;

        case "crossette":
          crossette(
            x,
            y,
            hue
          );
          break;

        case "brocade":
          brocade(
            x,
            y,
            hue
          );
          break;

        case "horsetail":
          horsetail(
            x,
            y,
            hue
          );
          break;

        case "waterfall":
          horsetail(
            x,
            y,
            hue
          );
          break;

        case "dahlia":
          dahlia(
            x,
            y,
            hue
          );
          break;

        case "kamuro":
          kamuro(
            x,
            y,
            hue
          );
          break;

        case "saturn":
          saturn(
            x,
            y,
            hue
          );
          break;

        case "double-ring":
          ring(
            x,
            y,
            hue,
            2
          );
          break;

        case "triple-ring":
          ring(
            x,
            y,
            hue,
            3
          );
          break;

        case "burst":
          burst(
            x,
            y,
            hue
          );
          break;

        case "comet":
          comet(
            x,
            y,
            hue
          );
          break;

        case "salute":
          salute(
            x,
            y,
            hue
          );
          break;

        case "multi-break":
          peony(
            x,
            y,
            hue,
            true
          );

          addSecondary(
            x,
            y,
            hue
          );

          addSecondary(
            x,
            y,
            hue + 70
          );

          break;

        case "finale":
          peony(
            x,
            y,
            hue,
            true
          );

          ring(
            x,
            y,
            hue + 80,
            2
          );

          crackle(
            x,
            y,
            hue + 150
          );

          break;

        default:
          peony(
            x,
            y,
            hue,
            special
          );
      }

      /*
       * Real fireworks often have
       * smaller secondary stars.
       */

      if (
        special ||
        type ===
          "multi-break" ||
        type ===
          "finale"
      ) {
        const amount =
          Math.min(
            3,
            Math.floor(
              qualityRef.current *
                3
            )
          );

        for (
          let i = 0;
          i < amount;
          i++
        ) {
          addSecondary(
            x,
            y,
            hue
          );
        }
      }
    };

    /*
=========================================================
ROCKET LAUNCH
=========================================================
*/

    const launchRocket = (
      targetX: number,
      targetY: number,
      special: boolean,
      now: number
    ) => {
      if (
        rocketsRef.current
          .length >=
        MAX_ROCKETS
      ) {
        return;
      }

      const safeTargetX =
        Math.max(
          width * 0.08,
          Math.min(
            width * 0.92,
            targetX
          )
        );

      const safeTargetY =
        Math.max(
          height * 0.12,
          Math.min(
            height * 0.52,
            targetY
          )
        );

      /*
       * Mostly vertical launch.
       * Very small natural variation.
       */

      const startX =
        safeTargetX +
        random(
          -10,
          10
        );

      const startY =
        height + 22;

      const dx =
        safeTargetX -
        startX;

      const dy =
        safeTargetY -
        startY;

      const distance =
        Math.sqrt(
          dx * dx +
            dy * dy
        );

      const baseSpeed =
        random(
          8.4,
          10.4
        );

      const rocket: Rocket =
        {
          x: startX,

          y: startY,

          vx:
            (dx / distance) *
            baseSpeed,

          vy:
            (dy / distance) *
            baseSpeed,

          targetX:
            safeTargetX,

          targetY:
            safeTargetY,

          hue:
            getHue(),

          trail: [],

          special,

          category:
            settingsRef.current
              .category,

          age: 0,

          maxAge: 150,

          style:
            settingsRef.current
              .type,
        };

      rocketsRef.current.push(
        rocket
      );
    };

    /*
=========================================================
AUTO LAUNCH
=========================================================
*/

    const autoLaunch = (
      now: number
    ) => {
      if (
        mode !== "auto"
      ) {
        return;
      }

      if (
        rocketsRef.current
          .length >=
        MAX_ROCKETS
      ) {
        return;
      }

      const targetX =
        random(
          width * 0.12,
          width * 0.88
        );

      const targetY =
        random(
          height * 0.13,
          height * 0.5
        );

      let special =
        nextSpecialRef.current;

      nextSpecialRef.current =
        !nextSpecialRef.current;

      if (
        settingsRef.current
          .finale
      ) {
        special =
          Math.random() <
          0.75;
      }

      launchRocket(
        targetX,
        targetY,
        special,
        now
      );
    };

    /*
=========================================================
MANUAL LAUNCH
=========================================================
*/

    const manualLaunch = (
      x: number,
      y: number,
      now: number
    ) => {
      let special =
        nextSpecialRef.current;

      nextSpecialRef.current =
        !nextSpecialRef.current;

      if (
        settingsRef.current
          .finale
      ) {
        special = true;
      }

      launchRocket(
        x,
        y,
        special,
        now
      );
    };

    /*
=========================================================
POINTER
=========================================================
*/

    const handlePointerDown =
      (event: PointerEvent) => {
        unlockAudio();

        if (
          event.pointerType ===
            "mouse" &&
          event.button !== 0
        ) {
          return;
        }

        if (
          mode !== "manual"
        ) {
          return;
        }

        if (
          settingsRef.current
            .paused
        ) {
          return;
        }

        const rect =
          canvas.getBoundingClientRect();

        manualLaunch(
          event.clientX -
            rect.left,

          event.clientY -
            rect.top,

          performance.now()
        );
      };

    canvas.addEventListener(
      "pointerdown",
      handlePointerDown,
      {
        passive: true,
      }
    );

    /*
=========================================================
CITY / SKY
=========================================================
*/

    const stars: {
      x: number;
      y: number;
      size: number;
      alpha: number;
      phase: number;
    }[] = [];

    for (
      let i = 0;
      i < 90;
      i++
    ) {
      stars.push({
        x: random(
          0,
          width
        ),

        y: random(
          0,
          height * 0.66
        ),

        size: random(
          0.35,
          1.2
        ),

        alpha: random(
          0.25,
          0.7
        ),

        phase: random(
          0,
          Math.PI * 2
        ),
      });
    }

    const buildings: {
      x: number;
      width: number;
      height: number;
      windows: number;
    }[] = [];

    let buildingX = 0;

    while (
      buildingX <
      width
    ) {
      const buildingWidth =
        random(
          28,
          70
        );

      const buildingHeight =
        random(
          height * 0.08,
          height * 0.3
        );

      buildings.push({
        x: buildingX,

        width:
          buildingWidth,

        height:
          buildingHeight,

        windows:
          randomInt(
            2,
            8
          ),
      });

      buildingX +=
        buildingWidth +
        random(
          2,
          8
        );
    }

    /*
=========================================================
BACKGROUND
=========================================================
*/

    const drawBackground = (
      now: number
    ) => {
      ctx.globalAlpha = 1;

      ctx.fillStyle =
        "#01030a";

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * Deep blue atmospheric
       * sky.
       */

      const sky =
        ctx.createLinearGradient(
          0,
          0,
          0,
          height
        );

      sky.addColorStop(
        0,
        "#01030a"
      );

      sky.addColorStop(
        0.55,
        "#03091a"
      );

      sky.addColorStop(
        1,
        "#02030a"
      );

      ctx.fillStyle =
        sky;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * Stars.
       */

      for (
        const star of stars
      ) {
        const twinkle =
          0.65 +
          Math.sin(
            now *
              0.001 +
              star.phase
          ) *
            0.25;

        ctx.globalAlpha =
          Math.max(
            0.05,
            star.alpha *
              twinkle
          );

        ctx.fillStyle =
          "#ffffff";

        ctx.fillRect(
          star.x,
          star.y,
          star.size,
          star.size
        );
      }

      /*
       * City silhouette.
       */

      ctx.globalAlpha = 1;

      ctx.fillStyle =
        "#02030a";

      for (
        const building of buildings
      ) {
        ctx.fillRect(
          building.x,

          height -
            building.height,

          building.width,

          building.height
        );

        /*
         * Small warm windows.
         */

        ctx.fillStyle =
          "rgba(255,190,80,0.20)";

        const columns =
          Math.max(
            1,
            Math.floor(
              building.width /
                14
            )
          );

        const rows =
          Math.max(
            1,
            Math.floor(
              building.height /
                17
            )
          );

        for (
          let row = 0;
          row < rows;
          row++
        ) {
          for (
            let col = 0;
            col < columns;
            col++
          ) {
            if (
              Math.random() <
              0.35
            ) {
              ctx.fillRect(
                building.x +
                  5 +
                  col *
                    12,

                height -
                  building.height +
                  8 +
                  row *
                    16,

                3,

                4
              );
            }
          }
        }

        ctx.fillStyle =
          "#02030a";
      }
    };

    /*
=========================================================
ROCKET DRAW
=========================================================
*/

    const drawRocket = (
      rocket: Rocket
    ) => {
      /*
       * Trail.
       */

      for (
        let i = 0;
        i <
        rocket.trail
          .length;
        i++
      ) {
        const point =
          rocket.trail[i];

        const alpha =
          point.alpha *
          (1 -
            i /
              rocket.trail
                .length);

        ctx.globalAlpha =
          alpha *
          0.55;

        ctx.fillStyle =
          `hsl(${normalizeHue(
            rocket.hue
          )},100%,75%)`;

        ctx.beginPath();

        ctx.arc(
          point.x,
          point.y,
          1.1,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      /*
       * Rocket glow.
       */

      const gradient =
        ctx.createRadialGradient(
          rocket.x,
          rocket.y,
          0,
          rocket.x,
          rocket.y,
          10
        );

      gradient.addColorStop(
        0,
        "rgba(255,255,255,0.9)"
      );

      gradient.addColorStop(
        0.2,
        `hsla(${rocket.hue},100%,75%,0.55)`
      );

      gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      ctx.globalAlpha = 1;

      ctx.fillStyle =
        gradient;

      ctx.beginPath();

      ctx.arc(
        rocket.x,
        rocket.y,
        10,
        0,
        Math.PI * 2
      );

      ctx.fill();

      /*
       * Hot rocket head.
       */

      ctx.fillStyle =
        "#ffffff";

      ctx.beginPath();

      ctx.arc(
        rocket.x,
        rocket.y,
        2.2,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.globalAlpha = 1;
    };

    /*
=========================================================
PARTICLE DRAW
=========================================================
*/

    const drawParticle = (
      p: Particle
    ) => {
      if (
        p.alpha <= 0
      ) {
        return;
      }

      const hue =
        normalizeHue(
          p.hue
        );

      /*
       * Short realistic trail.
       */

      const trailLength =
        Math.min(
          8,
          Math.max(
            2,
            Math.abs(
              p.vx
            ) +
              Math.abs(
                p.vy
              )
          )
        );

      ctx.globalAlpha =
        p.alpha *
        0.42;

      ctx.strokeStyle =
        `hsla(${hue},100%,72%,${p.alpha})`;

      ctx.lineWidth =
        Math.max(
          0.45,
          p.size *
            0.7
        );

      ctx.beginPath();

      ctx.moveTo(
        p.x,
        p.y
      );

      ctx.lineTo(
        p.x -
          p.vx *
            trailLength *
            0.18,

        p.y -
          p.vy *
            trailLength *
            0.18
      );

      ctx.stroke();

      /*
       * Small glow.
       */

      if (
        p.glow >
        0.3
      ) {
        ctx.globalAlpha =
          p.alpha *
          0.18;

        ctx.fillStyle =
          `hsl(${hue},100%,65%)`;

        ctx.beginPath();

        ctx.arc(
          p.x,
          p.y,
          p.size *
            3.2,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      /*
       * Hot core.
       */

      ctx.globalAlpha =
        p.alpha;

      ctx.fillStyle =
        "#fff7dc";

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size *
          0.55,
        0,
        Math.PI * 2
      );

      ctx.fill();

      /*
       * Colored body.
       */

      ctx.globalAlpha =
        p.alpha *
        0.78;

      ctx.fillStyle =
        `hsl(${hue},100%,68%)`;

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
      );

      ctx.fill();

      /*
       * Twinkle.
       */

      if (
        p.style === 3 &&
        Math.random() <
          0.09 *
            p.twinkle
      ) {
        ctx.globalAlpha =
          p.alpha;

        ctx.fillStyle =
          "#ffffff";

        ctx.fillRect(
          p.x - 1,
          p.y - 1,
          2,
          2
        );
      }
    };

    /*
=========================================================
INITIAL STATE
=========================================================
*/

    rocketsRef.current = [];

    particlesRef.current = [];

    secondaryRef.current = [];

    startTimeRef.current =
      performance.now();

    lastTimeRef.current =
      performance.now();

    lastLaunchRef.current =
      performance.now() -
      1200;

    lastFrameRef.current =
      performance.now();

    fpsRef.current = 60;

    qualityRef.current = 1;

    nextSpecialRef.current =
      false;

    /*
=========================================================
ANIMATION
=========================================================
*/

    const animate = (
      now: number
    ) => {
      if (stopped) {
        return;
      }

      /*
       * FPS protection.
       */

      const frameTime =
        now -
        lastFrameRef.current;

      lastFrameRef.current =
        now;

      if (
        frameTime > 0 &&
        frameTime < 100
      ) {
        const instantFPS =
          1000 /
          frameTime;

        fpsRef.current =
          fpsRef.current *
            0.92 +
          instantFPS *
            0.08;
      }

      /*
       * Automatically lower particle
       * quality if the browser struggles.
       */

      if (
        fpsRef.current <
        28
      ) {
        qualityRef.current =
          Math.max(
            0.48,
            qualityRef.current -
              0.025
          );
      } else if (
        fpsRef.current >
          53 &&
        qualityRef.current <
          1
      ) {
        qualityRef.current =
          Math.min(
            1,
            qualityRef.current +
              0.008
          );
      }

      /*
       * Auto duration.
       */

      if (
        mode === "auto"
      ) {
        const elapsed =
          (now -
            startTimeRef.current) /
          1000;

        if (
          elapsed >=
          duration * 60
        ) {
          stopped = true;

          rocketsRef.current = [];

          particlesRef.current = [];

          secondaryRef.current =
            [];

          onFinished();

          return;
        }
      }

      /*
       * Pause.
       */

      if (
        settingsRef.current
          .paused
      ) {
        lastTimeRef.current =
          now;

        drawBackground(
          now
        );

        animationRef.current =
          requestAnimationFrame(
            animate
          );

        return;
      }

      /*
       * Protect physics from huge
       * delta values.
       */

      const delta =
        Math.min(
          now -
            lastTimeRef.current,
          28
        );

      lastTimeRef.current =
        now;

      const dt =
        delta /
        16.6667;

      drawBackground(
        now
      );

      /*
       * Auto firing.
       */

      let autoDelay =
        1250;

      switch (
        settingsRef.current
          .intensity
      ) {
        case "low":
          autoDelay = 1650;
          break;

        case "high":
          autoDelay = 900;
          break;

        case "extreme":
          autoDelay = 700;
          break;

        default:
          autoDelay = 1150;
      }

      /*
       * Don't increase firing rate
       * when FPS is low.
       */

      if (
        fpsRef.current <
        35
      ) {
        autoDelay *= 1.35;
      }

      if (
        mode === "auto" &&
        now -
          lastLaunchRef.current >=
          autoDelay
      ) {
        autoLaunch(now);

        lastLaunchRef.current =
          now;
      }

      /*
=======================================================
ROCKET PHYSICS
=======================================================
*/

      for (
        let i =
          rocketsRef.current
            .length -
          1;
        i >= 0;
        i--
      ) {
        const rocket =
          rocketsRef.current[i];

        rocket.age += dt;

        /*
         * Rocket trail.
         */

        rocket.trail.unshift({
          x: rocket.x,

          y: rocket.y,

          alpha:
            rocket.special
              ? 0.9
              : 0.78,
        });

        if (
          rocket.trail
            .length >
          13
        ) {
          rocket.trail.pop();
        }

        for (
          const trail of
            rocket.trail
        ) {
          trail.alpha *=
            0.84;
        }

        /*
         * Slight realistic
         * launch acceleration.
         */

        const dx =
          rocket.targetX -
          rocket.x;

        const dy =
          rocket.targetY -
          rocket.y;

        /*
         * Correct the direction
         * gradually instead of
         * snapping.
         */

        const distance =
          Math.sqrt(
            dx * dx +
              dy * dy
          );

        if (
          distance > 1
        ) {
          const desiredVx =
            (dx /
              distance) *
            8.8;

          const desiredVy =
            (dy /
              distance) *
            8.8;

          rocket.vx +=
            (desiredVx -
              rocket.vx) *
            0.018 *
            dt;

          rocket.vy +=
            (desiredVy -
              rocket.vy) *
            0.018 *
            dt;
        }

        /*
         * Gravity.
         */

        rocket.vy +=
          0.035 *
          dt;

        /*
         * Rocket movement.
         */

        rocket.x +=
          rocket.vx *
          dt;

        rocket.y +=
          rocket.vy *
          dt;

        drawRocket(
          rocket
        );

        const closeEnough =
          distance <
          18;

        const movingUp =
          rocket.vy <
          0;

        const nearApex =
          movingUp ===
            false &&
          distance <
            55;

        const tooOld =
          rocket.age >
          rocket.maxAge;

        if (
          closeEnough ||
          nearApex ||
          tooOld
        ) {
          explode(
            rocket
          );

          rocketsRef.current.splice(
            i,
            1
          );
        }
      }

      /*
=======================================================
SECONDARY EXPLOSIONS
=======================================================
*/

      for (
        let i =
          secondaryRef.current
            .length -
          1;
        i >= 0;
        i--
      ) {
        const secondary =
          secondaryRef.current[i];

        secondary.age +=
          dt;

        if (
          secondary.age <
          secondary.delay
        ) {
          continue;
        }

        /*
         * Trigger only once.
         */

        const type =
          secondary.type;

        if (
          type ===
          "glitter"
        ) {
          glitter(
            secondary.x,
            secondary.y,
            secondary.hue
          );
        } else if (
          type ===
          "crackle"
        ) {
          crackle(
            secondary.x,
            secondary.y,
            secondary.hue
          );
        } else if (
          type ===
          "star"
        ) {
          star(
            secondary.x,
            secondary.y,
            secondary.hue
          );
        } else {
          burst(
            secondary.x,
            secondary.y,
            secondary.hue
          );
        }

        secondaryRef.current.splice(
          i,
          1
        );
      }

      /*
=======================================================
PARTICLE PHYSICS
=======================================================
*/

      for (
        let i =
          particlesRef.current
            .length -
          1;
        i >= 0;
        i--
      ) {
        const p =
          particlesRef.current[i];

        p.life += dt;

        if (
          p.life >=
          p.maxLife
        ) {
          particlesRef.current.splice(
            i,
            1
          );

          continue;
        }

        /*
         * Position.
         */

        p.x +=
          p.vx *
          dt;

        p.y +=
          p.vy *
          dt;

        /*
         * Air drag.
         */

        const friction =
          Math.pow(
            p.friction,
            dt
          );

        p.vx *=
          friction;

        p.vy *=
          friction;

        /*
         * Gravity.
         */

        p.vy +=
          p.gravity *
          dt;

        /*
         * Gentle horizontal air
         * movement.
         */

        p.vx +=
          Math.sin(
            p.life *
              0.025 +
              p.x *
                0.002
          ) *
          0.003 *
          dt;

        /*
         * Spiral physics.
         */

        if (
          p.style ===
          4
        ) {
          const oldVx =
            p.vx;

          p.vx +=
            -p.vy *
            p.spin *
            dt;

          p.vy +=
            oldVx *
            p.spin *
            dt;
        }

        /*
         * Fade.
         */

        const progress =
          p.life /
          p.maxLife;

        p.alpha =
          Math.pow(
            1 -
              progress,
            0.72
          );

        drawParticle(
          p
        );
      }

      ctx.globalAlpha = 1;

      /*
       * Continue.
       */

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };

    animationRef.current =
      requestAnimationFrame(
        animate
      );

    /*
=========================================================
CLEANUP
=========================================================
*/

    return () => {
      stopped = true;

      if (
        resizeTimer
      ) {
        clearTimeout(
          resizeTimer
        );
      }

      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "pointerdown",
        unlockAudio
      );

      window.removeEventListener(
        "keydown",
        unlockAudio
      );

      canvas.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      if (
        animationRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      rocketsRef.current = [];

      particlesRef.current = [];

      secondaryRef.current =
        [];

      // Shared audio manager intentionally stays alive across remounts.
    };
  }, [
    active,
    duration,
    mode,
    onFinished,
  ]);

  /*
=========================================================
UI CLASSES
=========================================================
*/

  const selectClass =
    "w-full rounded-lg border border-white/15 bg-black/85 px-3 py-2 text-xs font-semibold text-white outline-none backdrop-blur-md";

  const buttonClass =
    "rounded-lg border border-white/15 bg-black/75 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10 active:scale-95";

  /*
=========================================================
RETURN
=========================================================
*/

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden bg-[#01030a]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none"
      />

      {/* TOP STATUS */}

      <div className="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2">
        <div className="flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-5 py-2.5 shadow-xl backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-xs font-bold text-red-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

            LIVE
          </span>

          <span className="text-white/30">
            •
          </span>

          <span className="text-sm font-semibold text-white">
            🎆 Fireworks
          </span>

          <span className="text-white/30">
            •
          </span>

          <span className="text-xs font-bold uppercase text-white/60">
            {mode ===
            "auto"
              ? `${duration} MIN`
              : "MANUAL"}
          </span>

          {paused && (
            <>
              <span className="text-white/30">
                •
              </span>

              <span className="text-xs font-bold text-yellow-400">
                PAUSED
              </span>
            </>
          )}
        </div>
      </div>

      {/* SETTINGS */}

      {showControls && (
        <div className="absolute left-4 top-20 z-30 max-h-[calc(100vh-110px)] w-[255px] max-w-[calc(100vw-32px)] overflow-y-auto rounded-2xl border border-white/10 bg-black/75 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">
                🎆 Firework Settings
              </div>

              <div className="mt-0.5 text-[10px] text-white/45">
                Realistic fireworks show
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowControls(
                  false
                )
              }
              className="text-lg text-white/50 hover:text-white"
              aria-label="Hide controls"
            >
              ×
            </button>
          </div>

          <div className="space-y-2.5">
            {/* CATEGORY */}

            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/45">
                Firework Category
              </span>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value as FireworkCategory
                  )
                }
                className={
                  selectClass
                }
              >
                <option value="all">
                  🌎 All — India + USA + China
                </option>

                <option value="india">
                  🇮🇳 India
                </option>

                <option value="usa">
                  🇺🇸 USA
                </option>

                <option value="china">
                  🇨🇳 China
                </option>
              </select>
            </label>

            {/* TYPE */}

            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/45">
                Firework Style
              </span>

              <select
                value={fireworkType}
                onChange={(event) =>
                  setFireworkType(
                    event.target.value as FireworkType
                  )
                }
                className={
                  selectClass
                }
              >
                <option value="random">
                  🎲 Random Style
                </option>

                <option value="peony">
                  🌸 Peony
                </option>

                <option value="chrysanthemum">
                  🌼 Chrysanthemum
                </option>

                <option value="ring">
                  💍 Ring
                </option>

                <option value="double-ring">
                  💫 Double Ring
                </option>

                <option value="triple-ring">
                  🌟 Triple Ring
                </option>

                <option value="willow">
                  🌿 Willow
                </option>

                <option value="palm">
                  🌴 Palm
                </option>

                <option value="spiral">
                  🌀 Spiral
                </option>

                <option value="star">
                  ⭐ Star
                </option>

                <option value="glitter">
                  ✨ Glitter
                </option>

                <option value="crackle">
                  💥 Crackle
                </option>

                <option value="crossette">
                  ✚ Crossette
                </option>

                <option value="brocade">
                  🏆 Brocade
                </option>

                <option value="horsetail">
                  🐴 Horsetail
                </option>

                <option value="waterfall">
                  🌧️ Waterfall
                </option>

                <option value="dahlia">
                  🌺 Dahlia
                </option>

                <option value="kamuro">
                  🟡 Kamuro
                </option>

                <option value="saturn">
                  🪐 Saturn
                </option>

                <option value="burst">
                  💥 Burst
                </option>

                <option value="comet">
                  ☄️ Comet
                </option>

                <option value="salute">
                  💣 Salute
                </option>

                <option value="multi-break">
                  🎆 Multi Break
                </option>

                <option value="finale">
                  🔥 Grand Finale
                </option>
              </select>
            </label>

            {/* COLOR */}

            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/45">
                Color
              </span>

              <select
                value={colorMode}
                onChange={(event) =>
                  setColorMode(
                    event.target.value as ColorMode
                  )
                }
                className={
                  selectClass
                }
              >
                <option value="random">
                  🎲 Random
                </option>

                <option value="rainbow">
                  🌈 Rainbow
                </option>

                <option value="red">
                  🔴 Red
                </option>

                <option value="blue">
                  🔵 Blue
                </option>

                <option value="green">
                  🟢 Green
                </option>

                <option value="gold">
                  🟡 Gold
                </option>

                <option value="purple">
                  🟣 Purple
                </option>

                <option value="white">
                  ⚪ White
                </option>

                <option value="orange">
                  🟠 Orange
                </option>

                <option value="pink">
                  🩷 Pink
                </option>
              </select>
            </label>

            {/* SIZE */}

            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/45">
                Size
              </span>

              <select
                value={fireworkSize}
                onChange={(event) =>
                  setFireworkSize(
                    event.target.value as FireworkSize
                  )
                }
                className={
                  selectClass
                }
              >
                <option value="small">
                  Small
                </option>

                <option value="normal">
                  Normal
                </option>

                <option value="big">
                  💥 Big
                </option>

                <option value="giant">
                  🚀 Giant
                </option>
              </select>
            </label>

            {/* INTENSITY */}

            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/45">
                Intensity
              </span>

              <select
                value={intensity}
                onChange={(event) =>
                  setIntensity(
                    event.target.value as Intensity
                  )
                }
                className={
                  selectClass
                }
              >
                <option value="low">
                  Low
                </option>

                <option value="normal">
                  Normal
                </option>

                <option value="high">
                  🔥 High
                </option>

                <option value="extreme">
                  🚀 Extreme
                </option>
              </select>
            </label>

            {/* SOUND */}

            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/45">
                Explosion Sound
              </span>

              <select
                value={soundMode}
                onChange={(event) =>
                  setSoundMode(
                    event.target.value as SoundMode
                  )
                }
                className={
                  selectClass
                }
              >
                <option value="auto">
                  🔊 Auto — boom1 + boom2
                </option>

                <option value="boom1">
                  🔊 boom1 only
                </option>

                <option value="boom2">
                  🔊 boom2 only
                </option>

                <option value="off">
                  🔇 Off
                </option>
              </select>
            </label>

            {/* BUTTONS */}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() =>
                  setMuted(
                    (value) =>
                      !value
                  )
                }
                className={
                  buttonClass
                }
              >
                {muted
                  ? "🔇 Unmute"
                  : "🔊 Mute"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setPaused(
                    (value) =>
                      !value
                  )
                }
                className={
                  buttonClass
                }
              >
                {paused
                  ? "▶ Resume"
                  : "⏸ Pause"}
              </button>
            </div>

            {/* FINALE */}

            <button
              type="button"
              onClick={() =>
                setFinale(
                  (value) =>
                    !value
                )
              }
              className={`w-full rounded-lg border px-3 py-2 text-xs font-bold transition ${
                finale
                  ? "border-yellow-400/50 bg-yellow-400/15 text-yellow-300"
                  : "border-white/15 bg-black/60 text-white"
              }`}
            >
              {finale
                ? "🔥 Finale Mode ON"
                : "🎇 Finale Mode OFF"}
            </button>
          </div>
        </div>
      )}

      {/* SETTINGS SHOW BUTTON */}

      {!showControls && (
        <button
          type="button"
          onClick={() =>
            setShowControls(
              true
            )
          }
          className="absolute left-4 top-20 z-30 rounded-full border border-white/15 bg-black/75 px-4 py-2.5 text-xs font-bold text-white shadow-xl backdrop-blur-md"
        >
          🎆 Settings
        </button>
      )}

      {/* MODE MESSAGE */}

      <div className="pointer-events-none absolute bottom-24 left-1/2 z-20 -translate-x-1/2">
        <div className="whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-5 py-2.5 text-xs font-medium text-white/80 shadow-xl backdrop-blur-md">
          {mode ===
          "manual"
            ? "👆 Click or tap anywhere to launch"
            : `🎆 Automatic fireworks show • ${duration} minutes`}
        </div>
      </div>

      {/* BOTTOM CONTROLS */}

      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
        <button
          type="button"
          onClick={
            toggleFullscreen
          }
          aria-label={
            isFullscreen
              ? "Exit fullscreen"
              : "Enter fullscreen"
          }
          className="rounded-full border border-white/15 bg-black/80 px-5 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-md transition hover:bg-white/10 active:scale-95"
        >
          {isFullscreen
            ? "⛶ Exit Full Screen"
            : "⛶ Full Screen"}
        </button>

        <button
          type="button"
          onClick={
            onFinished
          }
          className="rounded-full border border-white/15 bg-black/80 px-6 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-md transition hover:bg-white/10 active:scale-95"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}