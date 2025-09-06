import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anjinappa N Portfolio",
  description: "Personal portfolio website of Anjinappa N - Senior Software Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-50 text-gray-900"}>
        {children}
      </body>
    </html>
  );
}
