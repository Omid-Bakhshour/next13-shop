import vazirFont from "@/constants/localFonts";
import "./globals.css";
import Header from "./Header";

export const metadata = {
  title: "Next Shop Panel",
  description: "Next.js Course Fronthooks Course",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body
        suppressHydrationWarning={true}
        className={`${vazirFont.variable} font-sans`}
      >
        <Header />
        <div className="w-full h-[calc(100vh-56px)] block ">{children}</div>
      </body>
    </html>
  );
}
