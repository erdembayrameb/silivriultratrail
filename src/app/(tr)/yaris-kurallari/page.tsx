import { DocumentScreen } from "@/components/document-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "rules");

export default function TrRulesPage() {
  return <DocumentScreen locale="tr" page="rules" />;
}
