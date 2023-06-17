import { NextResponse } from "next/server";
import { toStringCookies } from "./utils/functions";
export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  // console.log(req.url, req.nextUrl.pathname);
  //   if (pathname.startsWith("/profile")) {
  //     const user = await fetchUser(req);
  //     if (!user) return NextResponse.redirect(new URL("/auth", url));
  //   }

  //   if (pathname.startsWith("/admin")) {
  //     const user = await fetchUser(req);
  //     if (!user) return NextResponse.redirect(new URL("/auth", url));
  //     if (user && user.role !== "ADMIN")
  //       return NextResponse.redirect(new URL("/", req.url));
  //   }

  //   if (pathname.startsWith("/auth")) {
  //     const user = await fetchUser(req);
  //     if (user) return NextResponse.redirect(new URL("/", req.url));
  //   }
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/auth/:path*"],
};

// const fetchUser = async (req) => {
//   const { data } = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
//     {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         Cookie: toStringCookies(req.cookies),
//       },
//     }
//   ).then((res) => res.json());
//   const { user } = data || {};

//   return user;
// };
