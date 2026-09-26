import { FaqScreen } from "@/components/faq-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "faq");

export default function TrFaqPage() {
  return <FaqScreen locale="tr" />;
}
