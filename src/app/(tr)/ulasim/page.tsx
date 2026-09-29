import { ContentScreen } from "@/components/content-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "transport");

export default function TrTransportPage() {
  return <ContentScreen locale="tr" page="transport" />;
}
