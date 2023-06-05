import vazirFont from "@/constants/localFonts";
import "./globals.css";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import Providers from "./Providers";

export const metadata = {
  title: "Next Shop Panel",
  description: "Next.js Course Fronthooks Course",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={`${vazirFont.variable} font-sans bg-white dark:bg-slate-900`}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <Header />
          <div className="w-full h-[calc(100vh-56px)] block ">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
