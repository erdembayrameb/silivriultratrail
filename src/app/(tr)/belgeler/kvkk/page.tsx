import { DocumentScreen } from "@/components/document-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "docKvkk");

export default function TrKvkkPage() {
  return <DocumentScreen locale="tr" page="docKvkk" />;
}
