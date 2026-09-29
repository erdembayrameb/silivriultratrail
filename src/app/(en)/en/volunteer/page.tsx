import { buildPageMetadata } from "@/components/root-html";
import { VolunteerScreen } from "@/components/volunteer-screen";

export const metadata = buildPageMetadata("en", "volunteer");

export default function EnVolunteerPage() {
  return <VolunteerScreen locale="en" />;
}
