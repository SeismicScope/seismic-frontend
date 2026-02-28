import { redirect } from "next/navigation";

async function getOriginalUrl(code: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shortener/${code}/resolve`,
  );
  if (!res.ok) return null;

  return res.json();
}

export default async function ShortLinkPage({
  params,
}: {
  params: { code: string };
}) {
  const data = await getOriginalUrl(params.code);

  if (!data?.url) redirect("/not-found");

  redirect(data.url);
}
