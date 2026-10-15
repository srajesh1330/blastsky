import { permanentRedirect } from "next/navigation";

// The old fireworks page now lives on the home page.
export default function OldFireworksPage() {
  permanentRedirect("/");
}
