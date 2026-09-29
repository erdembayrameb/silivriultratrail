import { DocumentScreen } from "@/components/document-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "docWaiver");

export default function TrWaiverPage() {
  return <DocumentScreen locale="tr" page="docWaiver" />;
}
