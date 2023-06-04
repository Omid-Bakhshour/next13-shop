import vazirFont from "@/constants/localFonts";
import "./globals.css";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import Providers from "./Providers";
import { getDictionary } from "../../get-dictionary";

export const metadata = {
  title: "Next Shop Panel",
  description: "Next.js Course Fronthooks Course",
};

export default async function RootLayout({ children, params: { lang } }) {
  const dictionary = await getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={`${lang == "en" ? "ltr" : "rtl"}`}
      suppressHydrationWarning={true}
    >
      <body
        className={`${vazirFont.variable} font-sans bg-white dark:bg-slate-900`}
        suppressHydrationWarning={true}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <Header dictionary={dictionary} lang={lang} />
          <div className="w-full h-[calc(100vh-56px)] block ">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
