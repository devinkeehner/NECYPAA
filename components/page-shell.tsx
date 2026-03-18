import SiteFooter from "@/components/site-footer"
import MobileCtaBar from "@/components/mobile-cta-bar"

interface PageShellProps {
  badge: string
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export default function PageShell({ badge, title, subtitle, children }: PageShellProps) {
  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: "var(--nec-navy)" }}>
      <main className="flex-1 pt-24 pb-20 md:pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page header */}
            <div className="text-center mb-10">
              <span className="section-badge mb-4 inline-block">{badge}</span>
              <h1 className="section-heading mb-3">{title}</h1>
              {subtitle && (
                <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--nec-muted)" }}>
                  {subtitle}
                </p>
              )}
            </div>

            {/* Page content */}
            {children || (
              <div
                className="nec-card p-8 md:p-12 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ background: "rgba(0,212,232,0.1)", border: "1px solid rgba(0,212,232,0.2)" }}
                >
                  <span className="text-2xl" style={{ color: "var(--nec-cyan)" }}>🚧</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-3">Coming Soon</h2>
                <p className="text-sm max-w-md mx-auto" style={{ color: "var(--nec-muted)" }}>
                  This page is under construction. We&apos;re building something special — check back soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileCtaBar />
    </div>
  )
}
