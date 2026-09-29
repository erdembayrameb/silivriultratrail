import { CourseDetailScreen } from "@/components/course-detail-screen";
import { buildPageMetadata } from "@/components/root-html";

export const metadata = buildPageMetadata("tr", "course18k");

export default function TrCourse18kPage() {
  return <CourseDetailScreen locale="tr" page="course18k" />;
}
