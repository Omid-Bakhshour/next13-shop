"use client";

import DarkmodeBtn from "@/components/DarkmodeBtn";
import http from "@/services/httpService";
import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [isLoading, setIsaloading] = useState(true);

  const fetchUser = async () => {
    setIsaloading(true);
    try {
      const result = await http.get("/user/profile");

      if (result?.data?.data) {
        setUser(result?.data?.data?.user);
        setCart(result?.data?.data?.cart);
      }
      setIsaloading(false);
    } catch (error) {
      setIsaloading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <header
      className={`shadow-md  sticky top-0 z-20 transition-all duration-200 bg-white dark:bg-slate-900 ${
        isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav>
        <ul className="flex items-center  justify-between py-2 container xl:max-w-screen-xl">
          <li>
            <Link className="block py-2" href="/">
              خانه
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/products">
              محصولات
            </Link>
          </li>
          <li>
            {user ? (
              <span>{user.name}</span>
            ) : (
              <li>
                <Link className="block py-2" href="/auth">
                  ورود
                </Link>
              </li>
            )}
          </li>

          <li>
            <DarkmodeBtn />
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
