import { buildPageMetadata } from "@/components/root-html";
import { RunnerInfoScreen } from "@/components/runner-info-screen";

export const metadata = buildPageMetadata("tr", "runnerInfo");

export default function TrRunnerInfoPage() {
  return <RunnerInfoScreen locale="tr" />;
}
