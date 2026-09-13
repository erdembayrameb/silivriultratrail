import { buildMetadata, RootHtml } from "@/components/root-html";

export { viewport } from "@/components/root-html";

export const metadata = buildMetadata("en");

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootHtml locale="en">{children}</RootHtml>;
}
