import { ContentScreen } from "@/components/content-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "accommodation");

export default function EnAccommodationPage() {
  return <ContentScreen locale="en" page="accommodation" />;
}
