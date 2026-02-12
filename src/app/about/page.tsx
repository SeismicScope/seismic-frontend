import { Metadata } from "next";

import { Blogpost1 } from "@/shared/ui/blogpost1";

export const metadata: Metadata = {
  title: "About",
  description:
    "High-performance seismic intelligence platform processing 800K+ earthquake records with spatial queries, caching, and scalable full-stack architecture.",
};

function AboutPage() {
  return <Blogpost1 />;
}

export default AboutPage;
