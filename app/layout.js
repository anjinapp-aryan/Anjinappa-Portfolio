
export const metadata = {
  title: "Anjinappa N Portfolio",
  description: "Personal portfolio website of Anjinappa N - Senior Software Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
