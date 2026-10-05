export type BoomName = "boom1" | "boom2";

const FILES: Record<BoomName, string> = {
  boom1: "/sounds/fireworks/Boom1.mp3",
  boom2: "/sounds/fireworks/Boom2.mp3",
};

let context: AudioContext | null = null;
let master: AudioNode | null = null;
const buffers: Partial<Record<BoomName, AudioBuffer>> = {};

async function load(name: BoomName) {
  if (!context || buffers[name]) return;
  try {
    const res = await fetch(FILES[name]);
    buffers[name] = await context.decodeAudioData(await res.arrayBuffer());
  } catch {
    // Sound is optional; the show still works without it.
  }
}

/** Must be called from a click/tap so browsers allow audio. */
export async function unlockAudio(): Promise<boolean> {
  try {
    if (!context) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      context = new Ctor();
      const comp = context.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.ratio.value = 6;
      comp.connect(context.destination);
      master = comp;
    }
    await context.resume();
    await Promise.all([load("boom1"), load("boom2")]);
    return context.state === "running";
  } catch {
    return false;
  }
}

export function playBoom(name: BoomName, y01: number, volume: number) {
  const buffer = buffers[name];
  if (!context || !master || !buffer || context.state !== "running") return;

  // Higher bursts are further away, so the boom arrives a little later.
  const delay = 0.06 + (1 - Math.max(0, Math.min(1, y01))) * 0.22;
  const source = context.createBufferSource();
  const gain = context.createGain();
  source.buffer = buffer;
  source.playbackRate.value = 0.95 + Math.random() * 0.1;
  gain.gain.value = Math.min(1, volume * (name === "boom2" ? 1.0 : 0.8));
  source.connect(gain);
  gain.connect(master);
  source.start(context.currentTime + delay);
}
