import Link from "next/link"
import { Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left side - Logo and description（与 Header 一致） */}
          <div className="max-w-xl">
            {/* Logo - 点击返回首页 */}
            <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-90 transition-opacity">
              <span className="text-xl font-bold">
                <span className="text-primary">AI</span>
                <span className="text-foreground">工具导航</span>
              </span>
            </Link>
            
            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI工具导航致力于收录与更新全球AI工具，现已涵盖数百种不同类型。同时，我们为您精选常用的学习资源、开发框架与模型，助您轻松融入人工智能浪潮，高效实现自动化。按 Ctrl + D 或 ⌘ + D 可一键收藏本站。
            </p>
          </div>

          {/* Right side - Navigation links */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <nav className="flex items-center gap-6">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary transition-colors text-sm"
              >
                AI工具导航
              </Link>
              <Link 
                href="/about" 
                className="text-foreground hover:text-primary transition-colors text-sm"
              >
                关于我们
              </Link>
              <Link 
                href="/disclaimer" 
                className="text-foreground hover:text-primary transition-colors text-sm"
              >
                免责声明
              </Link>
              <Link 
                href="/contact" 
                className="text-foreground hover:text-primary transition-colors text-sm"
              >
                联系我们
              </Link>
            </nav>
            
            {/* Email icon */}
            <Link 
              href="mailto:2690540630@qq.com" 
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
            >
              <Mail className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <p className="text-muted-foreground text-xs">
            Copyright © 2026 AI工具导航 鄂ICP备2026008808号
          </p>
        </div>

      </div>
    </footer>
  )
}
