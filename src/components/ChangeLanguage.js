"use client";

import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";

function ChangeLanguage({ lang }) {
  const router = useRouter();

  const params = useParams();

  const pathname = usePathname();

  return (
    <div className="flex felx-row gap-2 items-center">
      <select value={lang} onChange={(e) => router.push(`/${e.target.value}/`)}>
        <option value={"fa"}>farsi</option>
        <option value={"en"}>english</option>
      </select>
    </div>
  );
}

export default ChangeLanguage;
