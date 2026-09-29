import { DocumentScreen } from "@/components/document-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "rules");

export default function EnRulesPage() {
  return <DocumentScreen locale="en" page="rules" />;
}
