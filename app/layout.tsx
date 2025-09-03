import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AaveProviderWrapper } from "@/components/aave-provider";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aave Wallet Investigator",
  description: "Explore Aave transaction history across all chains and markets. Comprehensive DeFi analytics for any wallet address on 14+ blockchain networks.",
  keywords: [
    "Aave",
    "DeFi",
    "wallet",
    "transaction history",
    "blockchain analytics",
    "Ethereum",
    "Polygon",
    "Arbitrum",
    "multi-chain",
    "lending protocol"
  ],
  authors: [{ name: "Aave Community" }],
  creator: "Aave Community",
  publisher: "justuseaave.xyz",
  metadataBase: new URL("https://wallet.justuseaave.xyz"),

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wallet.justuseaave.xyz",
    title: "Aave Wallet Investigator - Multi-Chain DeFi Analytics",
    description: "Explore Aave transaction history across all chains and markets. Comprehensive DeFi analytics for any wallet address on 14+ blockchain networks.",
    siteName: "Aave Wallet Investigator",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Aave Wallet Investigator - Multi-Chain DeFi Analytics",
        type: "image/svg+xml",
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@aave",
    creator: "@aave",
    title: "Aave Wallet Investigator - Multi-Chain DeFi Analytics",
    description: "Explore Aave transaction history across all chains and markets. Comprehensive DeFi analytics for any wallet address on 14+ blockchain networks.",
    images: ["/og-image.svg"],
  },

  // Additional meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // App specific
  applicationName: "Aave Wallet Investigator",
  category: "finance",
  classification: "DeFi Analytics Tool",

  // Icons
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },

  // PWA Manifest
  manifest: "/manifest.json",

  // Viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },

  // Verification (add these if you have them)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AaveProviderWrapper>
          {children}
        </AaveProviderWrapper>
        <Analytics />
      </body>
    </html>
  );
}
