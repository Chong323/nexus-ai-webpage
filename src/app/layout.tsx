import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nason Solar | Los Angeles Solar Installation & Battery Storage",
  description:
    "Veteran-owned solar EPC company in Los Angeles. Residential & commercial solar installation, Tesla Powerwall, Enphase battery storage, EV chargers, and solar farms. Free quotes for Southern California.",
  keywords: [
    "Los Angeles Solar Installation",
    "Solar Panel Installer LA",
    "Battery Storage California",
    "Tesla Powerwall Installer",
    "Enphase Battery",
    "EV Charger Installation",
    "Solar Farm EPC",
    "BESS",
    "Commercial Solar California",
    "Residential Solar Los Angeles",
    "Solar Carport",
    "Veteran Owned Solar Company",
    "Southern California Solar",
    "NEM 3.0",
    ],
  openGraph: {
    title: "Nason Solar | Los Angeles Solar Installation & Battery Storage",
    description:
      "Veteran-owned solar EPC. Residential, commercial & utility-scale solar. Tesla & Enphase certified. Free quotes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Nason Solar",
              description:
                "Veteran-owned solar EPC company providing residential, commercial, and utility-scale solar installation, battery storage, and EV charger services in Los Angeles and Southern California.",
              url: "https://nasonsolar.com",
              telephone: "(626)688-0123",
              email: "info@nasonsolar.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Los Angeles",
                addressRegion: "CA",
                addressCountry: "US",
              },
              areaServed: {
                "@type": "State",
                name: "California",
              },
              priceRange: "$$",
              openingHours: "Mo-Fr 08:00-18:00",
              sameAs: [
                "https://www.facebook.com/nasonsolar",
                "https://www.instagram.com/nasonsolar",
                "https://www.linkedin.com/company/nasonsolar",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
