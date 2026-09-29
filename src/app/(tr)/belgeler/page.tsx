import { DocumentsScreen } from "@/components/documents-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "documents");

export default function TrDocumentsPage() {
  return <DocumentsScreen locale="tr" />;
}
