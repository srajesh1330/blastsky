import { permanentRedirect } from "next/navigation";

// The old New Year page now lives on the home page (use the Countdown button there).
export default function OldNewYearPage() {
  permanentRedirect("/");
}
