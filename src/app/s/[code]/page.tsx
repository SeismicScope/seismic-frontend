import { redirect } from "next/navigation";

async function getOriginalUrl(code: string) {
  console.log("API_URL", process.env.API_URL);
  console.log("URL", `${process.env.API_URL}/shortener/resolve/${code}`);
  const res = await fetch(`${process.env.API_URL}/shortener/resolve/${code}`, {
    cache: "no-store",
  });
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
