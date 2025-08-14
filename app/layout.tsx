import { Toaster } from 'react-hot-toast';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shreyansh-portfolio.com"),
  title: "Shreyansh Pratap Mishra — Portfolio",
  description: "Computer Science Engineering student specializing in full‑stacks and developments.",
  openGraph: {
    title: "Shreyansh Pratap Mishra — Portfolio",
    description: "Projects, skills, and contact — full‑stack & ML.",
    url: "https://shreyansh-portfolio.com",
    images: ["/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreyansh Portfolio",
    images: ["/og-image.jpg"]
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://shreyansh-portfolio.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
