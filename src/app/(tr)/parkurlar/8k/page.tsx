import { CourseDetailScreen } from "@/components/course-detail-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "course8k");

export default function TrCourse8kPage() {
  return <CourseDetailScreen locale="tr" page="course8k" />;
}
