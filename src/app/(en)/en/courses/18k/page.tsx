import { CourseDetailScreen } from "@/components/course-detail-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("en", "course18k");

export default function EnCourse18kPage() {
  return <CourseDetailScreen locale="en" page="course18k" />;
}
