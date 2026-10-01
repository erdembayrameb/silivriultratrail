import { buildPageMetadata } from "@/components/root-html";
import { StartListScreen } from "@/components/start-list-screen";

export const metadata = buildPageMetadata("en", "startList");

export default function EnStartListPage() {
  return <StartListScreen locale="en" />;
}
