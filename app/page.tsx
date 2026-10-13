import Link from "next/link";
import FireworksShow from "../components/FireworksShow";
import AdSlot from "../components/AdSlot";
import { ARTICLES } from "../lib/articles";
import { CookieSettings } from "../components/Consent";

export default function Home() {
  return (
    <>
      <FireworksShow />
      <section className="doc">
        <h2>About this fireworks simulator</h2>
        <p>
          BlastSky is a free, interactive fireworks simulator that runs in your browser on phones, tablets and
          computers, so you can enjoy a virtual fireworks display anywhere. It simulates real firework shells. Each rocket climbs with a glowing tail, then bursts
          into hundreds of sparks that fly outward, slow down in the air, cool from white-hot to
          colour to a dim ember, and fall under gravity.
        </p>
        <h2>Shell types</h2>
        <p>
          You will see peonies, chrysanthemums with trailing sparks, golden willows that droop like
          weeping branches, tilted rings, palms, crackling glitter shells and double blasts that burst
          twice in a row. A single blast plays the Boom2 sound and a double blast plays Boom1.
        </p>
        <h2>How to use it</h2>
        <p>
          Press Start, then tap or click anywhere in the sky to launch a shell there. Use Finale for a
          rapid barrage, switch the automatic show on or off, and set the volume to suit you.
        </p>
        <h2>Fireworks guides</h2>
        <ul>
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link href={`/guides/${a.slug}`}>{a.title}</Link>
            </li>
          ))}
        </ul>
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} />
        <nav className="links">
          <Link href="/guides">Guides</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <CookieSettings />
        </nav>
      </section>
    </>
  );
}
