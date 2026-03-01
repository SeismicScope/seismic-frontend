import { redirect } from "next/navigation";

async function getOriginalUrl(code: string) {
  const res = await fetch(`${process.env.API_URL}/shortener/resolve/${code}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;

  return res.json();
}

export default async function ShortLinkPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const data = await getOriginalUrl(code);

  if (!data?.url) redirect("/not-found");

  redirect(data.url);
}
