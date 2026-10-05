import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = { title: "About BlastSky", alternates: { canonical: "/about" } };

export default function Page() {
  return (
    <LegalPage title="About BlastSky">
      <p>BlastSky is a free website that lets you watch and control a realistic fireworks show in your browser. It is built with HTML canvas and the Web Audio API, so it runs on phones, tablets and computers with nothing to install.</p>
      <p>Our goal is a show that looks and sounds like the real thing: rockets with glowing tails, layered bursts, cooling sparks, and booms that arrive a moment after the flash.</p>
    </LegalPage>
  );
}
