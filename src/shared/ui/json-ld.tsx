import Script from "next/script";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SeismicScope Platform",
    description:
      "High-performance earthquake analytics system with 800k+ seismic records",
    url: "https://seismic-scope.vercel.app",
    applicationCategory: "DataVisualization",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Real-time earthquake data",
      "Interactive maps",
      "Advanced filtering",
      "Analytics dashboard",
    ],
  };

  return (
    <Script
      id="json-jd-script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
