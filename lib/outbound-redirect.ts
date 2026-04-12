import { getAllTools } from "@/lib/tools-data"

/** 站内工具链接：以 / 开头且非 // 协议相对，不经过 /go 出站校验 */
export function isInternalToolUrl(url: string): boolean {
  return url.startsWith("/") && !url.startsWith("//")
}

/** 本站 tools-data 中登记过的出站地址（精确匹配，防开放重定向） */
const allowedOutboundUrls = new Set<string>(
  getAllTools()
    .map((t) => t.url)
    .filter((u) => /^https?:\/\//i.test(u))
)

/**
 * 校验 query 中的目标地址：必须为 http(s)，且与收录数据完全一致。
 * Next.js 的 searchParams.get("url") 已做一次解码。
 */
export function getValidatedOutboundUrl(
  raw: string | null | undefined
): string | null {
  if (raw == null) return null
  const trimmed = raw.trim()
  if (!trimmed) return null
  if (!/^https?:\/\//i.test(trimmed)) return null
  if (!allowedOutboundUrls.has(trimmed)) return null
  return trimmed
}
