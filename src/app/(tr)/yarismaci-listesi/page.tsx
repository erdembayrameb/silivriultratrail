import { buildPageMetadata } from "@/components/root-html";
import { StartListScreen } from "@/components/start-list-screen";

export const metadata = buildPageMetadata("tr", "startList");

export default function TrStartListPage() {
  return <StartListScreen locale="tr" />;
}
