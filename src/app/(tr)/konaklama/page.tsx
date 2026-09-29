import { ContentScreen } from "@/components/content-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "accommodation");

export default function TrAccommodationPage() {
  return <ContentScreen locale="tr" page="accommodation" />;
}
