import { ContentScreen } from "@/components/content-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "why");

export default function EnWhyPage() {
  return <ContentScreen locale="en" page="why" />;
}
