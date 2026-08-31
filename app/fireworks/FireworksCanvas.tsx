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

type FireworkType =
  | "random"
  | "peony"
  | "ring"
  | "willow"
  | "spiral"
  | "star"
  | "glitter"
  | "diwali"
  | "chakra"
  | "flower";

type ColorMode =
  | "random"
  | "rainbow"
  | "red"
  | "blue"
  | "green"
  | "gold"
  | "purple";

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
  style: number;
  spin: number;

  /* Added visual properties */
  glow: number;
  twinkle: number;
  drag: number;
  brightness: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  hue: number;
  width: number;
}

interface Flash {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  hue: number;
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
}

const NORMAL_SOUND = "/sounds/fireworks/boom1.mp3";
const SPECIAL_SOUND = "/sounds/fireworks/boom2.mp3";
const LAUNCH_SOUND = "/sounds/fireworks/launch.mp3";

const MAX_PARTICLES = 950;
const MAX_ROCKETS = 5;
const MAX_SHOCKWAVES = 12;
const MAX_FLASHES = 8;
const MAX_EMBERS = 180;

const MAX_DPR = 1.2;
const AUDIO_POOL_SIZE = 3;
const LAUNCH_INTERVAL = 4000;

const HUES = [
  0,
  18,
  35,
  48,
  120,
  175,
  195,
  215,
  270,
  315,
];

const COLOR_HUES: Record<
  Exclude<ColorMode, "random" | "rainbow">,
  number
> = {
  red: 0,
  blue: 215,
  green: 120,
  gold: 45,
  purple: 275,
};

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max + 1));
}

function randomHue(): number {
  return HUES[randomInt(0, HUES.length - 1)];
}

function normalizeHue(hue: number): number {
  return ((hue % 360) + 360) % 360;
}

function sizeMultiplier(size: FireworkSize): number {
  switch (size) {
    case "small":
      return 0.72;

    case "big":
      return 1.22;

    case "giant":
      return 1.42;

    default:
      return 1;
  }
}

function intensityMultiplier(intensity: Intensity): number {
  switch (intensity) {
    case "low":
      return 0.7;

    case "high":
      return 1.18;

    case "extreme":
      return 1.35;

    default:
      return 1;
  }
}

export default function FireworksCanvas({
  active,
  duration,
  mode,
  onFinished,
}: FireworksCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const animationRef = useRef<number | null>(null);

  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const flashesRef = useRef<Flash[]>([]);
  const embersRef = useRef<Ember[]>([]);

  const startTimeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastAutoLaunchRef = useRef(0);
  const lastLaunchSoundRef = useRef(0);

  const normalSoundPoolRef = useRef<HTMLAudioElement[]>([]);
  const specialSoundPoolRef = useRef<HTMLAudioElement[]>([]);
  const launchSoundPoolRef = useRef<HTMLAudioElement[]>([]);

  const normalSoundIndexRef = useRef(0);
  const specialSoundIndexRef = useRef(0);
  const launchSoundIndexRef = useRef(0);

  const audioUnlockedRef = useRef(false);
  const nextSpecialRef = useRef(false);

  const settingsRef = useRef({
    type: "random" as FireworkType,
    color: "random" as ColorMode,
    size: "normal" as FireworkSize,
    intensity: "normal" as Intensity,
    sound: "auto" as SoundMode,
    muted: false,
    paused: false,
    finale: false,
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [fireworkType, setFireworkType] =
    useState<FireworkType>("random");

  const [colorMode, setColorMode] =
    useState<ColorMode>("random");

  const [fireworkSize, setFireworkSize] =
    useState<FireworkSize>("normal");

  const [intensity, setIntensity] =
    useState<Intensity>("normal");

  const [soundMode, setSoundMode] =
    useState<SoundMode>("auto");

  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finale, setFinale] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    settingsRef.current = {
      type: fireworkType,
      color: colorMode,
      size: fireworkSize,
      intensity,
      sound: soundMode,
      muted,
      paused,
      finale,
    };
  }, [
    fireworkType,
    colorMode,
    fireworkSize,
    intensity,
    soundMode,
    muted,
    paused,
    finale,
  ]);

  const toggleFullscreen = useCallback(async () => {
    const element = containerRef.current;

    if (!element) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (element.requestFullscreen) {
        await element.requestFullscreen();
      }
    } catch {
      // Ignore fullscreen errors.
    }
  }, []);

  useEffect(() => {
    const handleFullscreen = () => {
      setIsFullscreen(
        document.fullscreenElement === containerRef.current
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreen
    );

    handleFullscreen();

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreen
      );
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });

    if (!ctx) return;

    let stopped = false;

    let width = 1;
    let height = 1;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      dpr = Math.min(
        window.devicePixelRatio || 1,
        MAX_DPR
      );

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

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

    let resizeTimer: ReturnType<typeof setTimeout> | null =
      null;

    const handleResize = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }

      resizeTimer = setTimeout(resize, 100);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    const createAudioPool = (src: string) => {
      const pool: HTMLAudioElement[] = [];

      for (
        let i = 0;
        i < AUDIO_POOL_SIZE;
        i++
      ) {
        const audio = new Audio(src);

        audio.preload = "auto";
        audio.load();

        pool.push(audio);
      }

      return pool;
    };

    normalSoundPoolRef.current =
      createAudioPool(NORMAL_SOUND);

    specialSoundPoolRef.current =
      createAudioPool(SPECIAL_SOUND);

    launchSoundPoolRef.current =
      createAudioPool(LAUNCH_SOUND);

    const unlockAudio = () => {
      audioUnlockedRef.current = true;
    };

    const playFromPool = (
      pool: HTMLAudioElement[],
      indexRef: { current: number },
      volume: number
    ) => {
      if (!audioUnlockedRef.current) return;

      if (settingsRef.current.muted) return;

      if (!pool.length) return;

      const index =
        indexRef.current % pool.length;

      indexRef.current += 1;

      const audio = pool[index];

      try {
        audio.pause();

        audio.currentTime = 0;

        audio.volume = volume;

        const promise = audio.play();

        if (promise) {
          promise.catch(() => {});
        }
      } catch {
        // Ignore audio errors.
      }
    };

    const playLaunchSound = (now: number) => {
      if (
        settingsRef.current.sound === "off"
      ) {
        return;
      }

      if (
        now - lastLaunchSoundRef.current <
        LAUNCH_INTERVAL
      ) {
        return;
      }

      lastLaunchSoundRef.current = now;

      playFromPool(
        launchSoundPoolRef.current,
        launchSoundIndexRef,
        0.45
      );
    };

    const playExplosionSound = (
      special: boolean
    ) => {
      const sound =
        settingsRef.current.sound;

      if (sound === "off") return;

      if (sound === "boom1") {
        playFromPool(
          normalSoundPoolRef.current,
          normalSoundIndexRef,
          0.62
        );

        return;
      }

      if (sound === "boom2") {
        playFromPool(
          specialSoundPoolRef.current,
          specialSoundIndexRef,
          0.78
        );

        return;
      }

      playFromPool(
        special
          ? specialSoundPoolRef.current
          : normalSoundPoolRef.current,
        special
          ? specialSoundIndexRef
          : normalSoundIndexRef,
        special ? 0.78 : 0.62
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
      const particles =
        particlesRef.current;

      if (
        particles.length >=
        MAX_PARTICLES
      ) {
        particles.splice(
          0,
          Math.min(
            80,
            particles.length -
              MAX_PARTICLES +
              1
          )
        );
      }

      particles.push(particle);
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
          58,
          105
        ),
        size: random(
          0.8,
          1.9
        ),
        hue:
          normalizeHue(
            hue +
              random(-7, 7)
          ),
        alpha: 1,
        gravity: 0.045,
        friction: 0.985,
        style: 0,
        spin: 0,

        glow: random(
          0.65,
          1.25
        ),

        twinkle: random(
          0.8,
          1.5
        ),

        drag: random(
          0.97,
          1
        ),

        brightness: random(
          0.88,
          1.15
        ),

        ...options,
      });
    };

    const getHue = () => {
      const color =
        settingsRef.current.color;

      if (color === "rainbow") {
        return random(
          0,
          360
        );
      }

      if (color === "random") {
        return randomHue();
      }

      return COLOR_HUES[color];
    };

    const getMultiplier = () =>
      sizeMultiplier(
        settingsRef.current.size
      ) *
      intensityMultiplier(
        settingsRef.current.intensity
      );

    /*
     * -----------------------------------------
     * REALISTIC LIGHT EFFECTS
     * -----------------------------------------
     */

    const addExplosionFlash = (
      x: number,
      y: number,
      hue: number,
      special: boolean
    ) => {
      if (
        flashesRef.current.length >=
        MAX_FLASHES
      ) {
        flashesRef.current.shift();
      }

      flashesRef.current.push({
        x,
        y,
        radius: special ? 14 : 9,
        alpha: special ? 0.42 : 0.28,
        hue,
      });
    };

    const addShockwave = (
      x: number,
      y: number,
      hue: number,
      special: boolean
    ) => {
      if (
        shockwavesRef.current.length >=
        MAX_SHOCKWAVES
      ) {
        shockwavesRef.current.shift();
      }

      const multiplier =
        sizeMultiplier(
          settingsRef.current.size
        );

      shockwavesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius:
          (special ? 105 : 72) *
          multiplier,
        alpha: special
          ? 0.3
          : 0.18,
        hue,
        width: special ? 2.2 : 1.4,
      });
    };

    const addEmbers = (
      x: number,
      y: number,
      hue: number,
      special: boolean
    ) => {
      const multiplier =
        getMultiplier();

      const count = Math.min(
        special
          ? 30
          : 18,
        Math.floor(
          24 * multiplier
        )
      );

      for (
        let i = 0;
        i < count;
        i++
      ) {
        if (
          embersRef.current.length >=
          MAX_EMBERS
        ) {
          break;
        }

        embersRef.current.push({
          x,
          y,
          vx: random(
            -2.4,
            2.4
          ),
          vy: random(
            -2.8,
            0.5
          ),
          life: 0,
          maxLife: random(
            65,
            125
          ),
          hue:
            hue +
            random(
              -25,
              45
            ),
          size: random(
            0.5,
            special
              ? 1.5
              : 1.1
          ),
        });
      }
    };

    /*
     * -----------------------------------------
     * PEONY
     * -----------------------------------------
     */

    const burstPeony = (
      x: number,
      y: number,
      hue: number,
      special: boolean
    ) => {
      const m =
        getMultiplier();

      const count =
        Math.floor(
          (special
            ? 105
            : 70) * m
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
            -0.025,
            0.025
          );

        createParticle(
          x,
          y,
          angle,
          random(
            special
              ? 3.2
              : 2.7,
            special
              ? 5.1
              : 4.4
          ) * m,
          hue +
            (i % 5) * 12,
          {
            maxLife:
              random(
                special
                  ? 72
                  : 62,
                special
                  ? 120
                  : 105
              ),

            gravity: 0.042,

            friction: 0.986,

            style:
              special
                ? 3
                : 0,

            size:
              random(
                0.9,
                2.1
              ),

            glow:
              special
                ? 1.3
                : 1,
          }
        );
      }

      /*
       * Small secondary burst
       * makes the explosion look
       * layered instead of flat.
       */
      const secondary =
        Math.floor(
          (special ? 30 : 20) *
            m
        );

      for (
        let i = 0;
        i < secondary;
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
            2.1
          ) * m,
          hue +
            random(
              30,
              75
            ),
          {
            maxLife:
              random(
                35,
                75
              ),
            gravity: 0.065,
            friction: 0.975,
            style: 3,
            size: random(
              0.6,
              1.4
            ),
            glow: 1.25,
          }
        );
      }
    };

    /*
     * -----------------------------------------
     * RING
     * -----------------------------------------
     */

    const burstRing = (
      x: number,
      y: number,
      hue: number,
      special: boolean
    ) => {
      const m =
        getMultiplier();

      const count =
        Math.floor(
          (special
            ? 105
            : 68) * m
        );

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
          (special
            ? 4.1
            : 3.3) * m,
          hue +
            (i % 6) * 10,
          {
            maxLife:
              random(
                68,
                112
              ),

            gravity: 0.025,

            friction: 0.989,

            style: 1,

            size:
              random(
                0.9,
                2
              ),

            glow: 1.15,
          }
        );
      }

      /*
       * Inner ring.
       */
      const inner =
        Math.floor(
          34 * m
        );

      for (
        let i = 0;
        i < inner;
        i++
      ) {
        const angle =
          (Math.PI * 2 * i) /
          inner;

        createParticle(
          x,
          y,
          angle,
          1.9 * m,
          hue + 45,
          {
            maxLife:
              random(
                40,
                78
              ),
            gravity: 0.018,
            friction: 0.99,
            style: 1,
            size: random(
              0.7,
              1.3
            ),
          }
        );
      }
    };

    /*
     * -----------------------------------------
     * WILLOW
     * -----------------------------------------
     */

    const burstWillow = (
      x: number,
      y: number,
      hue: number
    ) => {
      const m =
        getMultiplier();

      const count =
        Math.floor(
          65 * m
        );

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
            2.1,
            3.7
          ) * m,
          hue,
          {
            maxLife:
              random(
                100,
                145
              ),

            gravity: 0.072,

            friction: 0.992,

            style: 2,

            size:
              random(
                0.8,
                1.8
              ),

            glow: 0.85,
          }
        );
      }

      /*
       * Long falling golden embers.
       */
      addEmbers(
        x,
        y,
        hue,
        false
      );
    };

    /*
     * -----------------------------------------
     * SPIRAL
     * -----------------------------------------
     */

    const burstSpiral = (
      x: number,
      y: number,
      hue: number,
      special: boolean
    ) => {
      const m =
        getMultiplier();

      const count =
        Math.floor(
          (special
            ? 105
            : 78) * m
        );

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
          (special
            ? 10
            : 7);

        createParticle(
          x,
          y,
          angle,
          (1.7 +
            progress *
              3.7) *
            m,
          hue +
            progress *
              180,
          {
            maxLife:
              random(
                65,
                115
              ),

            gravity: 0.027,

            friction: 0.986,

            style: 4,

            spin: 0.016,

            glow: 1.1,
          }
        );
      }
    };

    /*
     * -----------------------------------------
     * STAR
     * -----------------------------------------
     */

    const burstStar = (
      x: number,
      y: number,
      hue: number,
      special: boolean
    ) => {
      const m =
        getMultiplier();

      const arms = 5;

      const particlesPerArm =
        Math.floor(
          (special
            ? 23
            : 17) * m
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

        for (
          let i = 0;
          i <
          particlesPerArm;
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
              2.8,
              5
            ) * m,
            hue +
              arm * 18,
            {
              maxLife:
                random(
                  65,
                  110
                ),

              gravity: 0.042,

              friction: 0.987,

              style: 3,

              glow:
                special
                  ? 1.35
                  : 1.05,
            }
          );
        }
      }
    };

    /*
     * -----------------------------------------
     * GLITTER
     * -----------------------------------------
     */

    const burstGlitter = (
      x: number,
      y: number,
      hue: number,
      special: boolean
    ) => {
      const m =
        getMultiplier();

      const count =
        Math.floor(
          (special
            ? 110
            : 75) * m
        );

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
            1.6,
            4.6
          ) * m,
          hue +
            random(
              -35,
              70
            ),
          {
            maxLife:
              random(
                55,
                115
              ),

            gravity: 0.052,

            friction: 0.982,

            style: 3,

            size:
              random(
                0.7,
                1.9
              ),

            glow: 1.35,

            twinkle: random(
              1.2,
              2
            ),
          }
        );
      }
    };

    /*
     * -----------------------------------------
     * DIWALI
     * -----------------------------------------
     */

    const burstDiwali = (
      x: number,
      y: number,
      hue: number
    ) => {
      const m =
        getMultiplier();

      const ringCount =
        Math.floor(
          58 * m
        );

      for (
        let i = 0;
        i < ringCount;
        i++
      ) {
        const angle =
          (Math.PI * 2 * i) /
          ringCount;

        createParticle(
          x,
          y,
          angle,
          3.7 * m,
          hue + 35,
          {
            maxLife:
              random(
                72,
                108
              ),

            gravity: 0.028,

            friction: 0.99,

            style: 1,

            size:
              random(
                0.9,
                2
              ),

            glow: 1.3,
          }
        );
      }

      for (
        let i = 0;
        i < 45;
        i++
      ) {
        const angle =
          (Math.PI * 2 * i) /
          45;

        createParticle(
          x,
          y,
          angle,
          2.2 * m,
          hue + 75,
          {
            maxLife:
              random(
                85,
                125
              ),

            gravity: 0.06,

            friction: 0.988,

            style: 3,

            glow: 1.25,
          }
        );
      }

      addEmbers(
        x,
        y,
        hue + 30,
        true
      );
    };

    /*
     * -----------------------------------------
     * CHAKRA
     * -----------------------------------------
     */

    const burstChakra = (
      x: number,
      y: number,
      hue: number
    ) => {
      const m =
        getMultiplier();

      for (
        let ring = 0;
        ring < 2;
        ring++
      ) {
        const count =
          Math.floor(
            (48 +
              ring * 8) *
              m
          );

        for (
          let i = 0;
          i < count;
          i++
        ) {
          const angle =
            (Math.PI * 2 * i) /
              count +
            ring * 0.08;

          createParticle(
            x,
            y,
            angle,
            (3 +
              ring *
                0.8) *
              m,
            hue +
              ring * 45,
            {
              maxLife:
                random(
                  65,
                  105
                ),

              gravity: 0.022,

              friction: 0.991,

              style: 1,

              size:
                random(
                  0.8,
                  1.8
                ),

              glow: 1.2,
            }
          );
        }
      }
    };

    /*
     * -----------------------------------------
     * FLOWER
     * -----------------------------------------
     */

    const burstFlower = (
      x: number,
      y: number,
      hue: number
    ) => {
      const m =
        getMultiplier();

      const petals = 8;

      for (
        let petal = 0;
        petal < petals;
        petal++
      ) {
        const angle =
          -Math.PI / 2 +
          (Math.PI * 2 * petal) /
            petals;

        for (
          let i = 0;
          i <
          Math.floor(
            15 * m
          );
          i++
        ) {
          createParticle(
            x,
            y,
            angle +
              random(
                -0.12,
                0.12
              ),
            random(
              2.4,
              4.8
            ) * m,
            hue +
              petal * 10,
            {
              maxLife:
                random(
                  70,
                  115
                ),

              gravity: 0.04,

              friction: 0.988,

              style: 3,

              glow: 1.2,
            }
          );
        }
      }
    };

    /*
     * -----------------------------------------
     * CRACKLE
     * -----------------------------------------
     */

    const addCrackle = (
      x: number,
      y: number,
      hue: number
    ) => {
      const count =
        Math.floor(
          32 *
            intensityMultiplier(
              settingsRef.current
                .intensity
            )
        );

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
            4
          ),
          hue +
            random(
              -45,
              80
            ),
          {
            maxLife:
              random(
                28,
                65
              ),

            gravity: 0.075,

            friction: 0.965,

            style: 3,

            size:
              random(
                0.6,
                1.5
              ),

            glow: 1.4,

            twinkle: 1.8,
          }
        );
      }
    };

    const chooseType =
      (): FireworkType => {
        const selected =
          settingsRef.current
            .type;

        if (
          selected !==
          "random"
        ) {
          return selected;
        }

        const types: FireworkType[] =
          [
            "peony",
            "ring",
            "willow",
            "spiral",
            "star",
            "glitter",
            "diwali",
            "chakra",
            "flower",
          ];

        return types[
          randomInt(
            0,
            types.length - 1
          )
        ];
      };

    const explode = (
      rocket: Rocket
    ) => {
      const x = rocket.x;
      const y = rocket.y;
      const hue = rocket.hue;

      playExplosionSound(
        rocket.special
      );

      /*
       * New realistic explosion lighting.
       */
      addExplosionFlash(
        x,
        y,
        hue,
        rocket.special
      );

      addShockwave(
        x,
        y,
        hue,
        rocket.special
      );

      addEmbers(
        x,
        y,
        hue,
        rocket.special
      );

      const type =
        chooseType();

      switch (type) {
        case "ring":
          burstRing(
            x,
            y,
            hue,
            rocket.special
          );
          break;

        case "willow":
          burstWillow(
            x,
            y,
            hue
          );
          break;

        case "spiral":
          burstSpiral(
            x,
            y,
            hue,
            rocket.special
          );
          break;

        case "star":
          burstStar(
            x,
            y,
            hue,
            rocket.special
          );
          break;

        case "glitter":
          burstGlitter(
            x,
            y,
            hue,
            rocket.special
          );
          break;

        case "diwali":
          burstDiwali(
            x,
            y,
            hue
          );
          break;

        case "chakra":
          burstChakra(
            x,
            y,
            hue
          );
          break;

        case "flower":
          burstFlower(
            x,
            y,
            hue
          );
          break;

        case "peony":
        default:
          burstPeony(
            x,
            y,
            hue,
            rocket.special
          );
          break;
      }

      if (rocket.special) {
        addCrackle(
          x,
          y,
          hue
        );
      }
    };

    const launchRocket = (
      targetX: number,
      targetY: number,
      now: number,
      special: boolean
    ) => {
      if (
        rocketsRef.current.length >=
        MAX_ROCKETS
      ) {
        return;
      }

      const x = Math.max(
        width * 0.04,
        Math.min(
          width * 0.96,
          targetX
        )
      );

      const y = Math.max(
        height * 0.08,
        Math.min(
          height * 0.72,
          targetY
        )
      );

      const startX =
        x +
        random(
          -18,
          18
        );

      const startY =
        height + 18;

      const dx =
        x - startX;

      const dy =
        y - startY;

      const distance =
        Math.max(
          1,
          Math.sqrt(
            dx * dx +
              dy * dy
          )
        );

      const speed =
        random(
          8.2,
          9.6
        );

      rocketsRef.current.push({
        x: startX,
        y: startY,
        vx:
          (dx / distance) *
          speed,
        vy:
          (dy / distance) *
          speed,
        targetX: x,
        targetY: y,
        hue: getHue(),
        trail: [],
        special,
      });

      playLaunchSound(
        now
      );
    };

    const launchAuto = (
      now: number
    ) => {
      if (
        mode !== "auto"
      ) {
        return;
      }

      if (
        rocketsRef.current.length >=
        MAX_ROCKETS
      ) {
        return;
      }

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
        random(
          width * 0.08,
          width * 0.92
        ),
        random(
          height * 0.1,
          height * 0.46
        ),
        now,
        special
      );
    };

    const launchManual = (
      x: number,
      y: number,
      now: number
    ) => {
      if (
        mode !== "manual"
      ) {
        return;
      }

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
        now,
        special
      );
    };

    const handlePointerDown = (
      event: PointerEvent
    ) => {
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

      launchManual(
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
      { passive: true }
    );

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
    }> = [];

    for (
      let i = 0;
      i < 55;
      i++
    ) {
      stars.push({
        x: random(
          0,
          width
        ),
        y: random(
          0,
          height * 0.7
        ),
        size: random(
          0.5,
          1.2
        ),
        alpha: random(
          0.25,
          0.65
        ),
      });
    }

    const drawBackground =
      () => {
        ctx.globalAlpha = 1;

        ctx.globalCompositeOperation =
          "source-over";

        ctx.fillStyle =
          "#02040b";

        ctx.fillRect(
          0,
          0,
          width,
          height
        );

        ctx.fillStyle =
          "#ffffff";

        for (
          const star of stars
        ) {
          ctx.globalAlpha =
            star.alpha;

          ctx.fillRect(
            star.x,
            star.y,
            star.size,
            star.size
          );
        }

        ctx.globalAlpha = 1;
      };

    /*
     * -----------------------------------------
     * REALISTIC ROCKET
     * -----------------------------------------
     */

    const drawRocket = (
      rocket: Rocket
    ) => {
      const trail =
        rocket.trail;

      /*
       * Soft rocket glow.
       */
      ctx.globalCompositeOperation =
        "lighter";

      ctx.globalAlpha = 0.16;

      ctx.fillStyle =
        `hsl(${rocket.hue},100%,65%)`;

      ctx.beginPath();

      ctx.arc(
        rocket.x,
        rocket.y,
        rocket.special
          ? 9
          : 6,
        0,
        Math.PI * 2
      );

      ctx.fill();

      /*
       * Rocket trail.
       */
      for (
        let i = 0;
        i < trail.length;
        i++
      ) {
        const point =
          trail[i];

        const fade =
          point.alpha *
          (1 -
            i /
              trail.length);

        ctx.globalAlpha =
          fade * 0.5;

        ctx.fillStyle =
          `hsl(${rocket.hue},100%,72%)`;

        ctx.beginPath();

        ctx.arc(
          point.x,
          point.y,
          rocket.special
            ? 1.5
            : 1,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      /*
       * Hot white rocket core.
       */
      ctx.globalAlpha = 1;

      ctx.fillStyle =
        "#ffffff";

      ctx.beginPath();

      ctx.arc(
        rocket.x,
        rocket.y,
        rocket.special
          ? 2.8
          : 2.2,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.globalCompositeOperation =
        "source-over";

      ctx.globalAlpha = 1;
    };

    /*
     * -----------------------------------------
     * REALISTIC PARTICLES
     * -----------------------------------------
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
       * Twinkle makes sparks
       * randomly brighten and fade.
       */
      const twinkle =
        0.82 +
        Math.sin(
          p.life *
            p.twinkle
        ) *
          0.18;

      const alpha =
        Math.max(
          0,
          p.alpha *
            twinkle
        );

      /*
       * Glow layer.
       */
      ctx.globalCompositeOperation =
        "lighter";

      ctx.globalAlpha =
        alpha *
        0.16 *
        p.glow;

      ctx.fillStyle =
        `hsl(${hue},100%,65%)`;

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size *
          (3 +
            p.glow),
        0,
        Math.PI * 2
      );

      ctx.fill();

      /*
       * Long bright spark.
       */
      ctx.globalAlpha =
        alpha;

      ctx.strokeStyle =
        `hsla(${hue},100%,78%,${alpha})`;

      ctx.lineWidth =
        Math.max(
          0.65,
          p.size
        );

      ctx.beginPath();

      ctx.moveTo(
        p.x,
        p.y
      );

      ctx.lineTo(
        p.x -
          p.vx *
            0.42,
        p.y -
          p.vy *
            0.42
      );

      ctx.stroke();

      /*
       * White-hot spark head.
       */
      ctx.fillStyle =
        `hsl(${hue},100%,${Math.min(
          98,
          88 *
            p.brightness
        )}%)`;

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        Math.max(
          0.65,
          p.size
        ),
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.globalCompositeOperation =
        "source-over";

      ctx.globalAlpha = 1;
    };

    /*
     * -----------------------------------------
     * SHOCKWAVE
     * -----------------------------------------
     */

    const drawShockwaves =
      () => {
        const waves =
          shockwavesRef.current;

        for (
          let i =
            waves.length - 1;
          i >= 0;
          i--
        ) {
          const wave =
            waves[i];

          wave.radius +=
            (wave.maxRadius -
              wave.radius) *
            0.075;

          wave.alpha *=
            0.965;

          if (
            wave.radius >=
              wave.maxRadius *
                0.98 ||
            wave.alpha <
              0.01
          ) {
            waves.splice(
              i,
              1
            );

            continue;
          }

          ctx.globalCompositeOperation =
            "lighter";

          ctx.globalAlpha =
            wave.alpha;

          ctx.strokeStyle =
            `hsla(${wave.hue},100%,80%,${wave.alpha})`;

          ctx.lineWidth =
            wave.width;

          ctx.beginPath();

          ctx.arc(
            wave.x,
            wave.y,
            wave.radius,
            0,
            Math.PI * 2
          );

          ctx.stroke();

          ctx.globalAlpha = 1;
        }

        ctx.globalCompositeOperation =
          "source-over";
      };

    /*
     * -----------------------------------------
     * EXPLOSION FLASH
     * -----------------------------------------
     */

    const drawFlashes =
      () => {
        const flashes =
          flashesRef.current;

        for (
          let i =
            flashes.length - 1;
          i >= 0;
          i--
        ) {
          const flash =
            flashes[i];

          flash.radius +=
            2.8;

          flash.alpha *=
            0.84;

          if (
            flash.alpha <
            0.012
          ) {
            flashes.splice(
              i,
              1
            );

            continue;
          }

          /*
           * Keep flash subtle.
           * This avoids the previous
           * overly-bright white screen.
           */
          ctx.globalCompositeOperation =
            "lighter";

          ctx.globalAlpha =
            flash.alpha;

          ctx.fillStyle =
            `hsl(${flash.hue},100%,72%)`;

          ctx.beginPath();

          ctx.arc(
            flash.x,
            flash.y,
            flash.radius,
            0,
            Math.PI * 2
          );

          ctx.fill();

          ctx.globalAlpha = 1;
        }

        ctx.globalCompositeOperation =
          "source-over";
      };

    /*
     * -----------------------------------------
     * FALLING EMBERS
     * -----------------------------------------
     */

    const updateEmbers = (
      dt: number
    ) => {
      const embers =
        embersRef.current;

      for (
        let i =
          embers.length - 1;
        i >= 0;
        i--
      ) {
        const ember =
          embers[i];

        ember.life +=
          dt;

        if (
          ember.life >=
          ember.maxLife
        ) {
          embers.splice(
            i,
            1
          );

          continue;
        }

        ember.x +=
          ember.vx * dt;

        ember.y +=
          ember.vy * dt;

        ember.vy +=
          0.045 * dt;

        ember.vx *=
          Math.pow(
            0.985,
            dt
          );

        const progress =
          ember.life /
          ember.maxLife;

        const alpha =
          progress < 0.65
            ? 0.8
            : 0.8 *
              (1 -
                (progress -
                  0.65) /
                  0.35);

        ctx.globalCompositeOperation =
          "lighter";

        ctx.globalAlpha =
          alpha;

        ctx.fillStyle =
          `hsl(${normalizeHue(
            ember.hue
          )},100%,80%)`;

        ctx.beginPath();

        ctx.arc(
          ember.x,
          ember.y,
          ember.size,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      ctx.globalCompositeOperation =
        "source-over";

      ctx.globalAlpha = 1;
    };

    rocketsRef.current = [];
    particlesRef.current = [];
    shockwavesRef.current = [];
    flashesRef.current = [];
    embersRef.current = [];

    const initialNow =
      performance.now();

    startTimeRef.current =
      initialNow;

    lastTimeRef.current =
      initialNow;

    lastAutoLaunchRef.current =
      initialNow - 800;

    lastLaunchSoundRef.current =
      initialNow -
      LAUNCH_INTERVAL;

    nextSpecialRef.current =
      false;

    const animate = (
      now: number
    ) => {
      if (stopped) {
        return;
      }

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

          rocketsRef.current.length = 0;
          particlesRef.current.length = 0;
          shockwavesRef.current.length = 0;
          flashesRef.current.length = 0;
          embersRef.current.length = 0;

          if (
            animationRef.current !==
            null
          ) {
            cancelAnimationFrame(
              animationRef.current
            );

            animationRef.current =
              null;
          }

          onFinished();

          return;
        }
      }

      if (
        settingsRef.current
          .paused
      ) {
        lastTimeRef.current =
          now;

        drawBackground();

        animationRef.current =
          requestAnimationFrame(
            animate
          );

        return;
      }

      let delta =
        now -
        lastTimeRef.current;

      lastTimeRef.current =
        now;

      /*
       * Important performance protection.
       *
       * Even after browser tab switching,
       * physics cannot jump several seconds
       * in one frame.
       */
      delta = Math.min(
        delta,
        28
      );

      const dt =
        delta /
        16.6667;

      drawBackground();

      const currentIntensity =
        settingsRef.current
          .intensity;

      const autoDelay =
        currentIntensity ===
        "low"
          ? 1450
          : currentIntensity ===
              "high"
            ? 900
            : currentIntensity ===
                "extreme"
              ? 700
              : 1120;

      if (
        mode === "auto" &&
        now -
          lastAutoLaunchRef.current >=
          autoDelay
      ) {
        launchAuto(
          now
        );

        lastAutoLaunchRef.current =
          now;
      }

      /*
       * -----------------------------------------
       * ROCKET PHYSICS
       * -----------------------------------------
       */

      const rockets =
        rocketsRef.current;

      for (
        let i =
          rockets.length - 1;
        i >= 0;
        i--
      ) {
        const rocket =
          rockets[i];

        rocket.trail.unshift({
          x: rocket.x,
          y: rocket.y,
          alpha: 0.8,
        });

        if (
          rocket.trail.length >
          10
        ) {
          rocket.trail.length =
            10;
        }

        for (
          let t = 0;
          t <
          rocket.trail.length;
          t++
        ) {
          rocket.trail[t].alpha *=
            0.82;
        }

        rocket.x +=
          rocket.vx * dt;

        rocket.y +=
          rocket.vy * dt;

        rocket.vy +=
          0.042 * dt;

        drawRocket(
          rocket
        );

        const dx =
          rocket.targetX -
          rocket.x;

        const dy =
          rocket.targetY -
          rocket.y;

        const distance =
          Math.sqrt(
            dx * dx +
              dy * dy
          );

        if (
          distance < 18 ||
          rocket.y <=
            rocket.targetY ||
          rocket.y < -80 ||
          rocket.x < -80 ||
          rocket.x >
            width + 80
        ) {
          explode(
            rocket
          );

          rockets.splice(
            i,
            1
          );
        }
      }

      /*
       * -----------------------------------------
       * PARTICLE PHYSICS
       * -----------------------------------------
       */

      const particles =
        particlesRef.current;

      for (
        let i =
          particles.length - 1;
        i >= 0;
        i--
      ) {
        const p =
          particles[i];

        p.life +=
          dt;

        if (
          p.life >=
            p.maxLife ||
          p.x < -120 ||
          p.x >
            width + 120 ||
          p.y >
            height + 150
        ) {
          particles.splice(
            i,
            1
          );

          continue;
        }

        p.x +=
          p.vx * dt;

        p.y +=
          p.vy * dt;

        p.vx *=
          Math.pow(
            p.friction,
            dt
          );

        p.vy *=
          Math.pow(
            p.friction,
            dt
          );

        p.vy +=
          p.gravity * dt;

        /*
         * Extra air drag.
         */
        p.vx *=
          Math.pow(
            p.drag,
            dt
          );

        p.vy *=
          Math.pow(
            p.drag,
            dt
          );

        /*
         * Spiral movement.
         */
        if (
          p.style === 4
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

        const progress =
          p.life /
          p.maxLife;

        /*
         * Natural fade.
         */
        if (
          progress <
          0.55
        ) {
          p.alpha = 1;
        } else {
          p.alpha =
            1 -
            (progress -
              0.55) /
              0.45;
        }

        /*
         * Willow gets a softer fade.
         */
        if (
          p.style === 2
        ) {
          p.alpha *=
            0.92;
        }

        drawParticle(
          p
        );
      }

      /*
       * New visual effects.
       */
      drawFlashes();

      drawShockwaves();

      updateEmbers(
        dt
      );

      ctx.globalAlpha = 1;

      ctx.globalCompositeOperation =
        "source-over";

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };

    animationRef.current =
      requestAnimationFrame(
        animate
      );

    return () => {
      stopped = true;

      if (resizeTimer) {
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

        animationRef.current =
          null;
      }

      rocketsRef.current.length = 0;
      particlesRef.current.length = 0;
      shockwavesRef.current.length = 0;
      flashesRef.current.length = 0;
      embersRef.current.length = 0;

      const pools = [
        normalSoundPoolRef.current,
        specialSoundPoolRef.current,
        launchSoundPoolRef.current,
      ];

      for (
        const pool of pools
      ) {
        for (
          const audio of pool
        ) {
          try {
            audio.pause();

            audio.currentTime = 0;

            audio.removeAttribute(
              "src"
            );

            audio.load();
          } catch {
            // Ignore cleanup errors.
          }
        }
      }

      normalSoundPoolRef.current = [];
      specialSoundPoolRef.current = [];
      launchSoundPoolRef.current = [];

      audioUnlockedRef.current =
        false;
    };
  }, [
    active,
    duration,
    mode,
    onFinished,
  ]);

  const selectClass =
    "rounded-lg border border-white/15 bg-black/80 px-3 py-2 text-xs font-semibold text-white outline-none backdrop-blur-md";

  const buttonClass =
    "rounded-lg border border-white/15 bg-black/75 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10 active:scale-95";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden bg-[#02040b]"
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
            {mode === "auto"
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
        <div className="absolute left-4 top-20 z-30 w-[245px] max-w-[calc(100vw-32px)] rounded-2xl border border-white/10 bg-black/75 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">
                🎆 Firework Settings
              </div>

              <div className="mt-0.5 text-[10px] text-white/45">
                Realistic • Diwali • Smooth
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowControls(
                  false
                )
              }
              className="text-lg text-white/50 transition hover:text-white"
              aria-label="Hide controls"
            >
              ×
            </button>
          </div>

          <div className="space-y-2.5">
            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/45">
                Firework Type
              </span>

              <select
                value={fireworkType}
                onChange={(event) =>
                  setFireworkType(
                    event.target
                      .value as FireworkType
                  )
                }
                className={
                  selectClass +
                  " w-full"
                }
              >
                <option value="random">
                  🎲 Random
                </option>

                <option value="peony">
                  🌸 Peony
                </option>

                <option value="ring">
                  💍 Ring
                </option>

                <option value="willow">
                  🌿 Willow
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

                <option value="diwali">
                  🪔 Diwali Gold
                </option>

                <option value="chakra">
                  ☸️ Chakra
                </option>

                <option value="flower">
                  🌺 Flower
                </option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/45">
                Color
              </span>

              <select
                value={colorMode}
                onChange={(event) =>
                  setColorMode(
                    event.target
                      .value as ColorMode
                  )
                }
                className={
                  selectClass +
                  " w-full"
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
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/45">
                Firework Size
              </span>

              <select
                value={fireworkSize}
                onChange={(event) =>
                  setFireworkSize(
                    event.target
                      .value as FireworkSize
                  )
                }
                className={
                  selectClass +
                  " w-full"
                }
              >
                <option value="small">
                  Small
                </option>

                <option value="normal">
                  Normal
                </option>

                <option value="big">
                  Big
                </option>

                <option value="giant">
                  💥 Giant
                </option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/45">
                Intensity
              </span>

              <select
                value={intensity}
                onChange={(event) =>
                  setIntensity(
                    event.target
                      .value as Intensity
                  )
                }
                className={
                  selectClass +
                  " w-full"
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

            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/45">
                Explosion Sound
              </span>

              <select
                value={soundMode}
                onChange={(event) =>
                  setSoundMode(
                    event.target
                      .value as SoundMode
                  )
                }
                className={
                  selectClass +
                  " w-full"
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
          {mode === "manual"
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