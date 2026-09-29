import { buildPageMetadata } from "@/components/root-html";
import { VolunteerScreen } from "@/components/volunteer-screen";

export const metadata = buildPageMetadata("tr", "volunteer");

export default function TrVolunteerPage() {
  return <VolunteerScreen locale="tr" />;
}
