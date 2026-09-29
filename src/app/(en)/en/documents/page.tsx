import { DocumentsScreen } from "@/components/documents-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "documents");

export default function EnDocumentsPage() {
  return <DocumentsScreen locale="en" />;
}
