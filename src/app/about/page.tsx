import { Metadata } from "next";

import Blogpost from "@/shared/ui/blogpost";

export const metadata: Metadata = {
  title: "About",
  description:
    "High-performance seismic intelligence platform processing 800K+ earthquake records with spatial queries, caching, and scalable full-stack architecture.",
};

function AboutPage() {
  return <Blogpost />;
}

export default AboutPage;
