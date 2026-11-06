import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "About BlastSky",
  description:
    "BlastSky is a free interactive fireworks simulator and guide site. Learn what it does, how the guides are written and how the site is funded.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <LegalPage title="About BlastSky">
      <p>
        BlastSky is an independent website with two parts: a free fireworks simulator you can play in your
        browser, and a growing library of plain-language guides about fireworks.
      </p>

      <h2>The simulator</h2>
      <p>
        The simulator imitates real fireworks on your screen. Rockets climb with a sparking tail and burst into
        hundreds of glowing sparks that spread, cool and fall, with booming sound that arrives just after the
        flash. You can tap the sky to launch your own shells, choose from more than twenty shell types, watch a
        planned show, count down to the new year, and write a message in the sky. It runs on phones, tablets and
        computers, with nothing to download or install.
      </p>

      <h2>The guides</h2>
      <p>
        Our <Link href="/guides">guides</Link> explain how fireworks work, what the different types and colours
        are, how to watch and photograph them, the history of fireworks, and how to stay safe. They are written in
        plain language for a general reader.
      </p>
      <p>
        We try to keep the guides accurate and useful. If you spot a mistake, please tell us through the{" "}
        <Link href="/contact">contact page</Link> and we will check it and correct it. The guides are general
        information only. For real fireworks, always follow local laws and the instructions on the product, and
        choose a professional public display when you can.
      </p>

      <h2>How the site is funded</h2>
      <p>
        BlastSky is free to use. To cover the costs of running it, we plan to show advertising from Google
        AdSense. Ads are kept away from the show itself. See our <Link href="/privacy">privacy policy</Link> for
        how cookies and ads are handled, and the Cookie settings link at the bottom of any page to change your
        choice.
      </p>

      <h2>Feedback</h2>
      <p>
        We would like to hear what you enjoy and what is missing. Use the <Link href="/contact">contact page</Link>{" "}
        to send ideas, bug reports or corrections.
      </p>
    </LegalPage>
  );
}
