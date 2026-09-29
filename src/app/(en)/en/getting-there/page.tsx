import { ContentScreen } from "@/components/content-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "transport");

export default function EnTransportPage() {
  return <ContentScreen locale="en" page="transport" />;
}
