import type { Metadata } from "next";

export const metadata: Metadata = {
  // ... (الإعدادات السابقة)
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Mohammed Aydan",
            "alternateName": "محمد أيدن",
            "url": "https://www.mohammed-aydan.me/",
          }),
        }}
      />
      <h1 className="text-4xl font-bold">Mohammed Aydan</h1>
      {/* باقي المحتوى */}


   
    </div>
  );
}