export function imgUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  if (path.startsWith('/')) return path
  return '/' + path
}
