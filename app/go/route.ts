import { NextRequest, NextResponse } from "next/server"
import { getValidatedOutboundUrl } from "@/lib/outbound-redirect"

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url")
  const target = getValidatedOutboundUrl(raw)
  if (!target) {
    return new NextResponse("Not Found", { status: 404 })
  }
  return NextResponse.redirect(target, 302)
}
