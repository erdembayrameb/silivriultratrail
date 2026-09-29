import { DocumentScreen } from "@/components/document-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "docKvkk");

export default function EnKvkkPage() {
  return <DocumentScreen locale="en" page="docKvkk" />;
}
