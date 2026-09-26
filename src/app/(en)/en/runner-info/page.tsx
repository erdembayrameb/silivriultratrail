import { buildPageMetadata } from "@/components/root-html";
import { RunnerInfoScreen } from "@/components/runner-info-screen";

export const metadata = buildPageMetadata("en", "runnerInfo");

export default function EnRunnerInfoPage() {
  return <RunnerInfoScreen locale="en" />;
}
