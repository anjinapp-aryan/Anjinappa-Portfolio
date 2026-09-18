import "./globals.css";
import { Inter } from "next/font/google";
import profile from "../data/profile";
import site from "../data/site";

const inter = Inter({ subsets: ["latin"] });

const description = `${profile.name} — ${profile.heroTitle}`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${profile.name} Portfolio`,
    template: `%s | ${profile.name}`,
  },
  description,
  openGraph: {
    title: `${profile.name} Portfolio`,
    description,
    url: site.url,
    siteName: `${profile.name} Portfolio`,
    images: [{ url: profile.photo }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${profile.name} Portfolio`,
    description,
    images: [profile.photo],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-background text-foreground"}>
        {children}
      </body>
    </html>
  );
}
