import { redirect } from "next/navigation";

import { DEFAULT_LOCALE } from "@/shared/constants";

export default function Page() {
  redirect(`/${DEFAULT_LOCALE}`);
}
