import { buildMetadata, RootHtml } from "@/components/root-html";

export { viewport } from "@/components/root-html";

export const metadata = buildMetadata("tr");

export default function TrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootHtml locale="tr">{children}</RootHtml>;
}
