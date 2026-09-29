import { DocumentScreen } from "@/components/document-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "docConsent");

export default function TrConsentPage() {
  return <DocumentScreen locale="tr" page="docConsent" />;
}
