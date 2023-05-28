import vazirFont from "@/constants/localFonts";
import "./globals.css";
import Header from "./Header";

export const metadata = {
  title: "Next Shop Panel",
  description: "Next.js Course Fronthooks Course",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        suppressHydrationWarning={true}
        className={`${vazirFont.variable} font-sans`}
      >
        <Header />
        <div className="container h-[calc(100vh-56px)] xl:max-w-screen-xl">
          {children}
        </div>
      </body>
    </html>
  );
}
