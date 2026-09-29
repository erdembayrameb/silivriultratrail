import { ContentScreen } from "@/components/content-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "why");

export default function TrWhyPage() {
  return <ContentScreen locale="tr" page="why" />;
}
