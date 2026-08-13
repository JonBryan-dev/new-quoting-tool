import type { Metadata } from "next";
import LocalServicePage, { localServiceMetadata } from "@/components/LocalServicePage";
import { getLocalService } from "@/lib/local-pages";

const SERVICE = "heat-pump-servicing";

export function generateStaticParams() {
  return (getLocalService(SERVICE)?.areas ?? []).map((a) => ({ town: a.townSlug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town } = await params;
  return localServiceMetadata(SERVICE, town) as Metadata;
}

export default async function Page({ params }: { params: Promise<{ town: string }> }) {
  const { town } = await params;
  return <LocalServicePage serviceSlug={SERVICE} townSlug={town} />;
}
