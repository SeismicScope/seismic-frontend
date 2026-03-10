import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://seismic-scope.vercel.app/en",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://seismic-scope.vercel.app/de",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://seismic-scope.vercel.app/es",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://seismic-scope.vercel.app/en/ashboard",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://seismic-scope.vercel.app/de/ashboard",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://seismic-scope.vercel.app/es/ashboard",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://seismic-scope.vercel.app/en/analytics",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://seismic-scope.vercel.app/de/analytics",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://seismic-scope.vercel.app/es/analytics",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://seismic-scope.vercel.app/en/map",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://seismic-scope.vercel.app/de/map",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://seismic-scope.vercel.app/es/map",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://seismic-scope.vercel.app/en/tiles-map",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://seismic-scope.vercel.app/de/tiles-map",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://seismic-scope.vercel.app/es/tiles-map",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://seismic-scope.vercel.app/en/about",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://seismic-scope.vercel.app/de/about",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://seismic-scope.vercel.app/es/about",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
