import { CourseDetailScreen } from "@/components/course-detail-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "course38k");

export default function TrCourse38kPage() {
  return <CourseDetailScreen locale="tr" page="course38k" />;
}
