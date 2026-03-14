import Link from "next/link"
import { Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left side - Logo and description */}
          <div className="max-w-xl">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  AI
                </span>
                <span className="text-2xl font-bold text-foreground">导航</span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI导航致力于收录与更新全球AI工具，现已涵盖数百种不同类型。同时，我们为您精选常用的学习资源、开发框架与模型，助您轻松融入人工智能浪潮，高效实现自动化。按 Ctrl + D 或 ⌘ + D 可一键收藏本站。
            </p>
          </div>

          {/* Right side - Navigation links */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <nav className="flex items-center gap-6">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary transition-colors text-sm"
              >
                AI导航
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
            </nav>
            
            {/* Email icon */}
            <Link 
              href="mailto:contact@aitoolbox.com" 
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
            >
              <Mail className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
