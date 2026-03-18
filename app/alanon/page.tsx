import type { Metadata } from "next"
import { NECYPAA_STATES } from "@/lib/data/states"
import { ExternalLink } from "lucide-react"
import SiteFooter from "@/components/site-footer"
import MobileCtaBar from "@/components/mobile-cta-bar"

export const metadata: Metadata = {
  title: "Al-Anon Resources — NECYPAA XXXVI",
  description:
    "Resources for friends and family of alcoholics. Al-Anon and Alateen information for the NECYPAA region.",
}

export default function AlAnonPage() {
  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: "var(--nec-navy)" }}>
      <main className="flex-1 pt-24 pb-20 md:pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page header */}
            <div className="text-center mb-10">
              <span className="section-badge mb-4 inline-block">Resources</span>
              <h1 className="section-heading mb-3">Al-Anon</h1>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--nec-muted)" }}>
                Resources for friends and family of alcoholics.
              </p>
            </div>

            {/* Tradition 6 Disclaimer */}
            <div
              className="rounded-xl p-5 mb-10 text-sm leading-relaxed"
              style={{
                background: "rgba(251,191,36,0.05)",
                border: "1px solid rgba(251,191,36,0.15)",
                color: "var(--nec-muted)",
              }}
            >
              <p>
                <strong style={{ color: "var(--nec-gold)" }}>A note on Tradition 6:</strong>{" "}
                NECYPAA is not affiliated with Al-Anon Family Groups, Inc. This page is provided as a
                resource for friends and family of alcoholics attending or interested in our convention.
                The links below are outbound resources — you will be leaving our site.
              </p>
            </div>

            {/* About Al-Anon */}
            <section className="nec-card p-6 md:p-8 mb-10">
              <h2 className="text-xl font-bold text-white mb-3">What is Al-Anon?</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--nec-text)" }}>
                Al-Anon Family Groups provide support for families and friends of alcoholics. Whether
                or not the alcoholic in your life recognizes the existence of a drinking problem or
                seeks help, Al-Anon can help you.
              </p>
              <a
                href="https://al-anon.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2"
              >
                Visit al-anon.org <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </section>

            {/* Meeting Finder CTA */}
            <section
              className="rounded-xl p-6 md:p-8 mb-10 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,232,0.08) 0%, rgba(26,34,54,0.7) 100%)",
                border: "1px solid rgba(0,212,232,0.18)",
              }}
            >
              <h2 className="text-xl font-bold text-white mb-2">Find an Al-Anon Meeting</h2>
              <p className="text-sm mb-4" style={{ color: "var(--nec-muted)" }}>
                Search for Al-Anon meetings near you or anywhere in the world.
              </p>
              <a
                href="https://al-anon.org/al-anon-meetings/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Al-Anon Meeting Finder <ExternalLink className="w-4 h-4" />
              </a>
            </section>

            {/* Al-Anon State Grid */}
            <section className="mb-10">
              <h2
                className="text-lg font-bold uppercase tracking-widest mb-2 pl-1"
                style={{ color: "var(--nec-cyan)", textShadow: "0 0 16px rgba(0,212,232,0.2)" }}
              >
                Al-Anon by State
              </h2>
              <p className="text-sm mb-6 pl-1" style={{ color: "var(--nec-muted)" }}>
                Find your state&apos;s Al-Anon resources. Each link takes you to that state&apos;s
                Al-Anon website.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {NECYPAA_STATES.map((state) => (
                  <a
                    key={state.abbreviation}
                    href={state.alanon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl p-4 text-center transition-all duration-200"
                    style={{
                      background: "rgba(26,34,54,0.6)",
                      border: "1px solid var(--nec-border)",
                    }}
                  >
                    <span
                      className="block text-2xl font-black mb-1 transition-colors group-hover:text-[var(--nec-cyan)]"
                      style={{ color: "var(--nec-text)" }}
                    >
                      {state.abbreviation}
                    </span>
                    <span className="block text-xs font-medium" style={{ color: "var(--nec-muted)" }}>
                      {state.name}
                    </span>
                    <ExternalLink
                      className="w-3 h-3 mx-auto mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "var(--nec-cyan)" }}
                    />
                  </a>
                ))}
              </div>
            </section>

            {/* Alateen State Grid */}
            <section className="mb-10">
              <h2
                className="text-lg font-bold uppercase tracking-widest mb-2 pl-1"
                style={{ color: "var(--nec-pink)", textShadow: "0 0 16px rgba(232,0,110,0.2)" }}
              >
                Alateen by State
              </h2>
              <p className="text-sm mb-6 pl-1" style={{ color: "var(--nec-muted)" }}>
                Alateen is for younger family members and friends of alcoholics. Some states share an
                Al-Anon/Alateen site; others have a dedicated Alateen page.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {NECYPAA_STATES.map((state) => {
                  const url = state.alanon.alateenUrl || state.alanon.url
                  return (
                    <a
                      key={state.abbreviation}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl p-4 text-center transition-all duration-200"
                      style={{
                        background: "rgba(26,34,54,0.6)",
                        border: "1px solid var(--nec-border)",
                      }}
                    >
                      <span
                        className="block text-2xl font-black mb-1 transition-colors group-hover:text-[var(--nec-pink)]"
                        style={{ color: "var(--nec-text)" }}
                      >
                        {state.abbreviation}
                      </span>
                      <span className="block text-xs font-medium" style={{ color: "var(--nec-muted)" }}>
                        {state.name}
                      </span>
                      <ExternalLink
                        className="w-3 h-3 mx-auto mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "var(--nec-pink)" }}
                      />
                    </a>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileCtaBar />
    </div>
  )
}
