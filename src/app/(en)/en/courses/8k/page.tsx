import { CourseDetailScreen } from "@/components/course-detail-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "course8k");

export default function EnCourse8kPage() {
  return <CourseDetailScreen locale="en" page="course8k" />;
}
