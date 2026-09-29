import { DocumentScreen } from "@/components/document-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "docConsent");

export default function EnConsentPage() {
  return <DocumentScreen locale="en" page="docConsent" />;
}
