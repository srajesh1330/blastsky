import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact BlastSky with questions, feedback, bug reports or corrections.",
  alternates: { canonical: "/contact" },
};

// Set NEXT_PUBLIC_CONTACT_FORM_URL in Vercel to your Google Form link (or another contact form).
const FORM_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;

export default function Page() {
  return (
    <LegalPage title="Contact">
      <p>
        Questions, feedback, bug reports and corrections to our guides are all welcome. We read every message and
        try to reply within a few days.
      </p>
      {FORM_URL ? (
        <p>
          <a className="btn-link" href={FORM_URL} target="_blank" rel="noopener noreferrer">
            Open the contact form
          </a>
        </p>
      ) : (
        <p>Our contact form is being set up. Please check back soon.</p>
      )}
      <h2>What to include</h2>
      <ul>
        <li>For a bug: the device and browser you use, and what you saw.</li>
        <li>For a correction: the page address and what looks wrong.</li>
        <li>For an idea: what you would like to see in BlastSky.</li>
      </ul>
      <p>If you want a reply, include an email address in your message.</p>
    </LegalPage>
  );
}
