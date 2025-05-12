import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token

  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")

  // Redirect authenticated users away from auth pages
  if (isAuthPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/chat", request.url))
    }
    return NextResponse.next()
  }

  // Protect chat routes
  if (request.nextUrl.pathname.startsWith("/chat")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/register", "/chat/:path*"],
}
