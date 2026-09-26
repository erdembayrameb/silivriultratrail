import { buildPageMetadata } from "@/components/root-html";
import { ScheduleScreen } from "@/components/schedule-screen";

export const metadata = buildPageMetadata("tr", "schedule");

export default function TrSchedulePage() {
  return <ScheduleScreen locale="tr" />;
}
