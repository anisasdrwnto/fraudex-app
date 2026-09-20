import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Jika Admin mencoba buka Landing Page (/), lempar paksa ke Dashboard
    if (token?.role === "admin" && path === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Jika User biasa mencoba buka Dashboard, lempar ke Landing Page
    if (token?.role === "user" && path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        
        // Daftar halaman PUBLIK yang BOLEH diakses walau belum login
        if (
          path === "/" || 
          path.startsWith("/api/") || 
          path === "/login" || 
          path === "/register"
        ) {
          return true; // Izinkan masuk
        }
        
        // Halaman selain di atas (dashboard, history, profile) WAJIB ada token/login
        return !!token;
      },
    },
    pages: { signIn: "/login" },
  }
);

// Tentukan rute mana saja yang dipantau oleh middleware
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/history/:path*",
    "/profile/:path*",
  ],
};