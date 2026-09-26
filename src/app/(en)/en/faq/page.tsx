import { FaqScreen } from "@/components/faq-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "faq");

export default function EnFaqPage() {
  return <FaqScreen locale="en" />;
}
