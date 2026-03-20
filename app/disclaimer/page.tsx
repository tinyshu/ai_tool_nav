import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "免责声明 - AI工具导航",
  description:
    "AI工具导航为用户提供站外链接便利，不对链接内容的准确性与完整性承担保证责任。以下为详细免责声明内容。",
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="w-6 h-6 text-primary" aria-hidden />
            <h1 className="text-2xl font-bold text-foreground">免责声明</h1>
          </div>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              <span className="font-semibold text-foreground">一.</span> 鉴于网络服务的特殊性，AI 导航所链接的域名可能因过期等原因被他人重新注册，AI 导航无法保证所链接网站的正确性、可靠性。用户应审慎识别所访问的网站，并自行承担相关风险。
            </p>
            <p>
              <span className="font-semibold text-foreground">二.</span> AI 导航不保证网络服务一定能满足用户的要求，也不保证网络服务不会中断，对服务的及时性、安全性、准确性也都不作保证。
            </p>
            <p>
              <span className="font-semibold text-foreground">三.</span> AI 导航为方便用户而提供的站外链接，不保证其准确性与完整性。对于该等站外链接所指向的、非由 AI 导航实际控制的网页上的任何内容，AI 导航不承担任何责任。
            </p>
            <p>
              <span className="font-semibold text-foreground">四.</span> 对于因电信系统或互联网网络故障、计算机故障或病毒、信息损坏或丢失、计算机系统问题或其它任何不可抗力原因而造成的损失，AI 导航不承担责任。但将尽力减少因此给用户造成的损失和影响。
            </p>
            <p>
              <span className="font-semibold text-foreground">五.</span> 用户同意 AI 导航有权随时变更、中断或终止部分或全部网络服务。如变更、中断或终止的服务属于免费服务，AI 导航无需通知用户，也无需对任何用户或第三方承担任何责任。
            </p>
            <p>
              <span className="font-semibold text-foreground">六.</span> AI 导航可随时因任何原因修改本服务或删除本服务的部分功能。AI 导航可随时取消或终止对用户的服务。取消或终止服务的决定无需理由或对用户进行通知。服务取消后，用户使用本服务的权利立即终止。服务取消或终止后，用户在本服务中存储的任何信息可能无法恢复。
            </p>
            <p>
              <span className="font-semibold text-foreground">七.</span> AI 导航不对以下事项作任何保证：
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>AI 导航服务符合用户要求；</li>
              <li>AI 导航服务不中断、及时、安全、可靠或无误；通过 AI 导航获得的任何产品、服务或其他材料符合用户期望；</li>
              <li>用户通过 AI 导航下载或获取任何数据须自行承担全部风险；因该等使用而导致计算机系统损坏或数据丢失，由用户自行负责。</li>
            </ol>
            <p>
              <span className="font-semibold text-foreground">八.</span> 无论因以下何种原因造成的利润、商誉、数据等方面的直接或间接损失，AI 导航均不承担任何责任：
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>使用或无法使用 AI 导航服务；</li>
              <li>通过 AI 导航购买或获取任何产品、数据或服务；</li>
              <li>未经授权使用或篡改用户数据；以及与 AI 导航有关的其他事项。</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
