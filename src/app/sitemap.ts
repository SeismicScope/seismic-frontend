import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://seismic-scope.vercel.app",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://seismic-scope.vercel.app/dashboard",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://seismic-scope.vercel.app/analytics",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://seismic-scope.vercel.app/map",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://seismic-scope.vercel.app/tiles-map",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://seismic-scope.vercel.app/about",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
