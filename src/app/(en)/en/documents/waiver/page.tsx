import { DocumentScreen } from "@/components/document-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "docWaiver");

export default function EnWaiverPage() {
  return <DocumentScreen locale="en" page="docWaiver" />;
}
