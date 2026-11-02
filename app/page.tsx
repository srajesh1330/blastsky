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
          computers, so you can enjoy a virtual fireworks display anywhere. Each rocket climbs with a
          sparking tail, then bursts into hundreds of sparks that fly outward, slow down in the air, cool from
          white-hot to colour to a dim ember, and fall under gravity. Want to run a show for friends? Read our
          guide to <Link href="/guides/host-a-virtual-fireworks-display">hosting a virtual fireworks display</Link>.
        </p>

        <h2>What you can do</h2>
        <ul>
          <li>Tap or click the sky to launch your own shells, and choose from more than twenty shell types.</li>
          <li>Watch the Grand show, or Today&apos;s show, a planned show that changes every day.</li>
          <li>Start the Countdown for New Year&apos;s Eve, from ten down to a big finale.</li>
          <li>Write a message in the sky, then send a greeting link so a friend sees it in their own sky.</li>
          <li>Pick a theme such as Diwali gold, New Year, red, white and blue, Christmas or rainbow.</li>
          <li>Save a photo of your sky, or switch to full screen for a bigger show.</li>
        </ul>

        <h2>Shell types</h2>
        <p>
          You will see peonies, chrysanthemums with trailing sparks, golden willows and kamuro that droop like
          weeping branches, glittering brocades, pistils with a different coloured centre, crossettes, rings,
          palms, strobes, crackling shells and double blasts that burst twice in a row. Our guide to{" "}
          <Link href="/guides/types-of-fireworks-explained">types of fireworks</Link> explains how to tell them
          apart.
        </p>

        <h2>How to use it</h2>
        <p>
          Press Start, then tap or click anywhere in the sky to launch a shell there. Use Finale for a rapid
          barrage, switch the automatic show on or off, and set the volume to suit you. Open the Controls button
          to find the themes, the Tap shell menu and the message box.
        </p>

        <h2>Frequently asked questions</h2>
        <h3>What is a fireworks simulator?</h3>
        <p>
          It is a program that imitates real fireworks on a screen. BlastSky draws the rockets, the bursts and
          the falling sparks and plays booming sounds, so you get the look of a show with no fire, smoke or risk.
        </p>
        <h3>Is BlastSky free?</h3>
        <p>Yes. It is free to use, with no sign-up and nothing to download.</p>
        <h3>Does it work on a phone?</h3>
        <p>
          Yes. It works on phones, tablets and computers. For the biggest show, turn your phone sideways or use
          the Full screen button.
        </p>
        <h3>Why do I have to press Start?</h3>
        <p>
          Web browsers block sound until you interact with a page. Pressing Start lets BlastSky play the booms.
        </p>
        <h3>Is it a game?</h3>
        <p>
          It is closer to a toy than a scored game. You choose the shells, the colours and the timing, and you
          can write your own messages in the sky.
        </p>
        <h3>Can I use it for a party or New Year&apos;s Eve?</h3>
        <p>
          Yes. Connect a computer to a television, turn the sound up and press Countdown. Our guide to{" "}
          <Link href="/guides/new-years-eve-fireworks-around-the-world">New Year&apos;s Eve fireworks</Link> has
          more ideas.
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
