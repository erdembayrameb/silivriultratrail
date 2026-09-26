import { buildPageMetadata } from "@/components/root-html";
import { ScheduleScreen } from "@/components/schedule-screen";

export const metadata = buildPageMetadata("en", "schedule");

export default function EnSchedulePage() {
  return <ScheduleScreen locale="en" />;
}
