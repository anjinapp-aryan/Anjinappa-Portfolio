import "./globals.css";
import { Inter } from "next/font/google";
import profile from "../data/profile";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${profile.name} Portfolio`,
  description: `Personal portfolio website of ${profile.name} - Senior Software Engineer`,
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
