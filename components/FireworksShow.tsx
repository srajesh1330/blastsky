"use client";

import { useEffect, useRef, useState } from "react";
import { FireworksEngine, drawScene, drawSkyline, type ShellKind, type Theme } from "../lib/fireworks";
import { playBoom, unlockAudio, type BoomName } from "../lib/audio";

const SHELLS: [ShellKind, string][] = [
  ["peony", "Peony"], ["chrysanthemum", "Chrysanthemum"], ["willow", "Willow"], ["ring", "Ring"],
  ["palm", "Palm"], ["crackle", "Crackle"], ["double", "Double blast"], ["crossette", "Crossette"], ["spiral", "Spiral"], ["pistil", "Pistil"], ["saturn", "Saturn"],
  ["horsetail", "Horsetail"], ["kamuro", "Kamuro"], ["triple", "Triple blast"], ["serpent", "Serpent"],
  ["comet", "Comet"], ["strobe", "Strobe"], ["brocade", "Brocade"], ["dahlia", "Dahlia"], ["twocolor", "Two colour"],
  ["silver", "Silver willow"], ["tripistil", "Triple pistil"], ["colorchange", "Colour change"],
  ["chryscrackle", "Crackle chrysanthemum"],
];

type SoundMode = "auto" | "boom1" | "boom2" | "off";

export default function FireworksShow() {
  const stageRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLCanvasElement>(null);
  const smokeRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<FireworksEngine | null>(null);
  const settings = useRef({ sound: "auto" as SoundMode, volume: 0.8, started: false });

  const [started, setStarted] = useState(false);
  const [auto, setAuto] = useState(true);
  const [sound, setSound] = useState<SoundMode>("auto");
  const [volume, setVolume] = useState(80);
  const [theme, setTheme] = useState<Theme>("mixed");
  const [shells, setShells] = useState(0);
  const [streak, setStreak] = useState(0);
  const total = useRef(0);
  const [showOn, setShowOn] = useState(false);
  const [finaleOn, setFinaleOn] = useState(false);
  const [isFs, setIsFs] = useState(false);
  const [fsNote, setFsNote] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [launchSpeed, setLaunchSpeed] = useState("normal");
  const [msg, setMsg] = useState("");
  const [cityFront, setCityFront] = useState(false);
  const [tapKind, setTapKind] = useState("random");
  const [note, setNote] = useState("");
  const tapKindRef = useRef<ShellKind | undefined>(undefined);
  const autoBefore = useRef(true);

  useEffect(() => {
    const stage = stageRef.current;
    const sky = skyRef.current;
    const fx = fxRef.current;
    if (!stage || !sky || !fx) return;

    const engine = new FireworksEngine(fx);
    if (smokeRef.current) engine.attachSmoke(smokeRef.current);
    engineRef.current = engine;

    engine.onTagDone = (tag) => {
      if (tag === "finale") {
        setFinaleOn(false);
        return;
      }
      setShowOn(false);
      if (autoBefore.current) {
        setAuto(true);
        engine.setAuto(true);
      }
    };

    const onFs = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);

    engine.onLaunch = () => {
      total.current += 1;
      setShells(total.current);
      if (total.current % 5 === 0) {
        try {
          localStorage.setItem("bs_total", String(total.current));
        } catch {
          // Ignore storage errors.
        }
      }
    };

    engine.onBurst = ({ double, y01 }) => {
      const s = settings.current;
      if (!s.started || s.sound === "off") return;
      // Single blast = Boom2, double blast = Boom1 (unless forced).
      const name: BoomName =
        s.sound === "boom1" ? "boom1" : s.sound === "boom2" ? "boom2" : double ? "boom1" : "boom2";
      playBoom(name, y01, s.volume);
    };

    const fit = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      sky.width = Math.floor(w * dpr);
      sky.height = Math.floor(h * dpr);
      const sctx = sky.getContext("2d");
      if (sctx) {
        sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawScene(sctx, w, h);
      }

      const front = frontRef.current;
      if (front) {
        front.width = Math.floor(w * dpr);
        front.height = Math.floor(h * dpr);
        const fctx = front.getContext("2d");
        if (fctx) {
          fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          drawSkyline(fctx, w, h);
        }
      }
      engine.resize(w, h, dpr);
    };

    fit();
    engine.start();

    const observer = new ResizeObserver(fit);
    observer.observe(stage);

    return () => {
      observer.disconnect();
      document.removeEventListener("fullscreenchange", onFs);
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  const start = async () => {
    await unlockAudio();
    settings.current.started = true;
    try {
      total.current = Number(localStorage.getItem("bs_total") || 0);
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 864e5).toDateString();
      const last = localStorage.getItem("bs_last");
      let days = Number(localStorage.getItem("bs_streak") || 0);
      if (last !== today) days = last === yesterday ? days + 1 : 1;
      localStorage.setItem("bs_last", today);
      localStorage.setItem("bs_streak", String(days));
      setStreak(days);
      setShells(total.current);
    } catch {
      setStreak(1);
    }
    try {
      setCityFront(localStorage.getItem("bs_city") === "1");
    } catch {
      // Ignore storage errors.
    }
    setPanelOpen(window.innerWidth > 700);
    setStarted(true);
    engineRef.current?.launch();

    // A shared greeting link (?msg=...) writes that message in the sky.
    const shared = new URLSearchParams(window.location.search).get("msg");
    if (shared) {
      const clean = shared.slice(0, 24);
      setMsg(clean);
      window.setTimeout(() => engineRef.current?.writeText(clean), 1500);
    }
  };

  const toggleFullscreen = async () => {
    const stage = stageRef.current;
    if (!stage) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (stage.requestFullscreen) {
        await stage.requestFullscreen();
      } else {
        setFsNote(true);
      }
    } catch {
      setFsNote(true);
    }
  };

  const writeMsg = () => {
    if (msg.trim()) engineRef.current?.writeText(msg);
  };

  const shareGreeting = async () => {
    const text = msg.trim().slice(0, 24);
    if (!text) {
      setNote("Type a wish first, then share it.");
      return;
    }
    const url = `${window.location.origin}${window.location.pathname}?msg=${encodeURIComponent(text)}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "BlastSky", text: `A fireworks greeting for you: ${text}`, url });
      } else {
        await navigator.clipboard.writeText(url);
        setNote("Greeting link copied. Send it to a friend!");
      }
    } catch {
      setNote(url);
    }
  };

  const toggleCity = () => {
    const next = !cityFront;
    setCityFront(next);
    try {
      localStorage.setItem("bs_city", next ? "1" : "0");
    } catch {
      // Ignore storage errors.
    }
  };

  const savePhoto = () => {
    const sky = skyRef.current;
    const smoke = smokeRef.current;
    const fx = fxRef.current;
    if (!sky || !fx) return;
    const out = document.createElement("canvas");
    out.width = sky.width;
    out.height = sky.height;
    const g = out.getContext("2d");
    if (!g) return;
    g.drawImage(sky, 0, 0, out.width, out.height);
    if (smoke) g.drawImage(smoke, 0, 0, out.width, out.height);
    g.drawImage(fx, 0, 0, out.width, out.height);
    if (frontRef.current && cityFront) g.drawImage(frontRef.current, 0, 0, out.width, out.height);
    g.font = `${Math.max(14, Math.round(out.width * 0.016))}px system-ui, sans-serif`;
    g.fillStyle = "rgba(255,255,255,0.7)";
    g.fillText("blastsky.vercel.app", 18, out.height - 16);
    out.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "blastsky-fireworks.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const toggleFinale = () => {
    const engine = engineRef.current;
    if (!engine) return;
    if (finaleOn) {
      engine.stop("finale");
    } else {
      engine.finale();
      setFinaleOn(true);
    }
  };

  const toggleShow = () => {
    const engine = engineRef.current;
    if (!engine) return;
    if (showOn) {
      engine.stop("show");
    } else {
      autoBefore.current = auto;
      setAuto(false);
      engine.setAuto(false);
      engine.playShow();
      setShowOn(true);
    }
  };

  const onStagePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!settings.current.started) return;
    const rect = event.currentTarget.getBoundingClientRect();
    engineRef.current?.launch(event.clientX - rect.left, event.clientY - rect.top, tapKindRef.current);
  };

  return (
    <div ref={stageRef} className="stage" onPointerDown={onStagePointer}>
      <canvas ref={skyRef} className="layer" aria-hidden="true" />
      <canvas ref={smokeRef} className="layer" aria-hidden="true" />
      <canvas ref={fxRef} className="layer" aria-label="Fireworks show" />
      <canvas
        ref={frontRef}
        className="layer"
        aria-hidden="true"
        style={{ visibility: cityFront ? "visible" : "hidden" }}
      />

      <button
        className="fs"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggleFullscreen}
        aria-label={isFs ? "Exit full screen" : "Full screen"}
      >
        {isFs ? "✕ Exit full screen" : "⛶ Full screen"}
      </button>
      {fsNote && (
        <div className="fsnote" onPointerDown={(e) => e.stopPropagation()}>
          Full screen isn&apos;t available in this browser. On iPhone, use Share → Add to Home Screen.
        </div>
      )}

      {!started && (
        <div className="overlay">
          <h1>BlastSky</h1>
          <p>A realistic fireworks show in your browser. Turn your sound on.</p>
          <button className="primary" onClick={start}>
            ▶ Start the show
          </button>
        </div>
      )}

      {started && !panelOpen && (
        <button
          className="pill"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setPanelOpen(true)}
        >
          ⚙ Controls
        </button>
      )}

      {started && panelOpen && (
        <div className="panel" onPointerDown={(e) => e.stopPropagation()}>
          <button className="hide" onClick={() => setPanelOpen(false)}>
            ▾ Hide controls
          </button>
          <button
            onClick={() => {
              setAuto(!auto);
              engineRef.current?.setAuto(!auto);
            }}
          >
            {auto ? "⏸ Auto show: on" : "▶ Auto show: off"}
          </button>
          <button onClick={toggleFinale}>{finaleOn ? "⏹ Stop finale" : "🎆 Finale"}</button>
          <button onClick={toggleShow}>{showOn ? "⏹ Stop show" : "🎇 Grand show"}</button>
          <button onClick={() => engineRef.current?.groundFx()}>⛲ Ground fx</button>
          <button onClick={savePhoto}>📸 Save photo</button>
          <button onClick={toggleCity}>{cityFront ? "🏙 City in front: on" : "🏙 City in front: off"}</button>
          <button
            disabled={showOn}
            onClick={() => {
              const d = new Date();
              const day = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
              const r = engineRef.current?.playDaily(day);
              if (r && r.name) {
                setTheme(r.theme);
                setNote(`Today's show: ${r.name}. A new one every day!`);
              }
            }}
          >
            📅 Today&apos;s show
          </button>
          <button disabled={showOn} onClick={() => engineRef.current?.playCountdown()}>
            ⏱ Countdown
          </button>
          <label>
            Tap shell
            <select
              id="tap-select"
              name="tapshell"
              value={tapKind}
              onChange={(e) => {
                setTapKind(e.target.value);
                tapKindRef.current = e.target.value === "random" ? undefined : (e.target.value as ShellKind);
              }}
            >
              <option value="random">Random</option>
              {SHELLS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <div className="write">
            <input
              id="msg-input"
              name="message"
              type="text"
              maxLength={24}
              placeholder="Type a wish, e.g. Happy Birthday"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") writeMsg();
              }}
            />
            <button onClick={writeMsg}>✍ Write in sky</button>
            <button onClick={shareGreeting}>🔗 Share greeting</button>
          </div>
          {note && <span className="hint">{note}</span>}
          <label>
            Theme
            <select
              id="theme-select"
              name="theme"
              value={theme}
              onChange={(e) => {
                const v = e.target.value as Theme;
                setTheme(v);
                engineRef.current?.setTheme(v);
              }}
            >
              <option value="mixed">Colourful mix</option>
              <option value="gold">Diwali gold</option>
              <option value="newyear">New Year</option>
              <option value="patriotic">Red, white &amp; blue</option>
              <option value="christmas">Christmas</option>
              <option value="rainbow">Rainbow</option>
            </select>
          </label>
          <label>
            Launch
            <select
              id="launch-select"
              name="launch"
              value={launchSpeed}
              onChange={(e) => {
                const v = e.target.value;
                setLaunchSpeed(v);
                engineRef.current?.setLaunchScale(v === "slow" ? 1.4 : v === "fast" ? 0.6 : 1);
              }}
            >
              <option value="slow">Slow</option>
              <option value="normal">Normal</option>
              <option value="fast">Fast</option>
            </select>
          </label>
          <label>
            Sound
            <select
              id="sound-select"
              name="sound"
              value={sound}
              onChange={(e) => {
                const v = e.target.value as SoundMode;
                setSound(v);
                settings.current.sound = v;
              }}
            >
              <option value="auto">Auto (single: boom2, double: boom1)</option>
              <option value="boom1">Boom1 only</option>
              <option value="boom2">Boom2 only</option>
              <option value="off">Off</option>
            </select>
          </label>
          <label>
            Volume {volume}%
            <input
              id="volume-range"
              name="volume"
              type="range"
              min={0}
              max={100}
              step={5}
              value={volume}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                settings.current.volume = v / 100;
              }}
            />
          </label>
          <span className="hint">
            Tap the sky to launch your own shell · Shells fired: {shells}
            {streak > 1 ? ` · 🔥 ${streak}-day streak, come back tomorrow!` : ""}
          </span>
        </div>
      )}
    </div>
  );
}
