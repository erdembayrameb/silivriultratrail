import { CourseDetailScreen } from "@/components/course-detail-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "course38k");

export default function EnCourse38kPage() {
  return <CourseDetailScreen locale="en" page="course38k" />;
}
