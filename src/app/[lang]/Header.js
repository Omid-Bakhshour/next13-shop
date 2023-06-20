"use client";

import ChangeLanguage from "@/components/ChangeLanguage";
import DarkmodeBtn from "@/components/DarkmodeBtn";
import Link from "next/link";

function Header({ dictionary, lang }) {
  return (
    <header
      className={`shadow-md  sticky top-0 z-20 transition-all duration-200 bg-white dark:bg-slate-900
      }`}
    >
      <nav>
        <ul className="flex items-center  justify-between py-2 container xl:max-w-screen-xl">
          <li>
            <Link className="block py-2" href={`/${lang}`}>
              خانه
            </Link>
          </li>
          <li>
            <Link className="block py-2" href={`/${lang}/products`}>
              محصولات
            </Link>
          </li>
          <li>
            <Link className="block py-2" href={`/${lang}/auth`}>
              {dictionary?.header?.login}
            </Link>
          </li>

          <li>
            <DarkmodeBtn />
          </li>

          <li>
            <ChangeLanguage lang={lang} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
