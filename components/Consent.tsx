"use client";

import { useEffect, useState } from "react";

type Gtag = (...args: unknown[]) => void;

function setConsent(granted: boolean) {
  const w = window as typeof window & { gtag?: Gtag };
  const v = granted ? "granted" : "denied";
  w.gtag?.("consent", "update", {
    analytics_storage: v,
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
  });
}

/** Cookie banner. Analytics and ads stay off until the visitor accepts. */
export default function Consent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const open = () => setShow(true);
    window.addEventListener("bs-open-consent", open);

    const id = window.setTimeout(() => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("bs_consent");
      } catch {
        // Ignore storage errors.
      }
      if (saved === "granted") setConsent(true);
      else if (saved !== "denied") setShow(true);
    }, 0);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("bs-open-consent", open);
    };
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem("bs_consent", granted ? "granted" : "denied");
    } catch {
      // Ignore storage errors.
    }
    setConsent(granted);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="consent" role="dialog" aria-label="Cookie consent">
      <p>
        We use cookies to count visits and, later, to show ads that keep BlastSky free. You can accept or
        reject them. See our <a href="/privacy">privacy policy</a>.
      </p>
      <div className="consent-row">
        <button onClick={() => choose(false)}>Reject</button>
        <button className="yes" onClick={() => choose(true)}>
          Accept
        </button>
      </div>
    </div>
  );
}

/** A link-style button that lets visitors change their cookie choice later. */
export function CookieSettings() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("bs-open-consent"))}>
      Cookie settings
    </button>
  );
}
