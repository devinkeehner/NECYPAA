import Link from "next/link"
import { HOTEL_BOOKING_URL, NECYPAA_ADVISORY_URL, CONTACT_EMAIL } from "@/lib/constants"
import { Mail, ExternalLink } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer
      className="mt-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, rgba(11,18,32,1) 0%, rgba(8,13,24,1) 100%)" }}
    >
      {/* Top accent bar */}
      <div
        className="h-[2px] w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, var(--nec-pink) 20%, var(--nec-cyan) 50%, var(--nec-orange) 80%, transparent 100%)",
          boxShadow: "0 0 12px rgba(0,212,232,0.3), 0 0 24px rgba(232,0,110,0.15)",
        }}
      />

      <div className="container mx-auto px-4 py-12 pb-24 md:pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Identity column */}
          <div className="space-y-3">
            <h2
              className="text-xl font-black uppercase tracking-tight"
              style={{ color: "var(--nec-cyan)", textShadow: "0 0 16px rgba(0,212,232,0.25)" }}
            >
              NECYPAA XXXVI
            </h2>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">CT Host Committee</p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              The Northeast Convention of Young People in Alcoholics Anonymous — Hartford, Connecticut.
              Dec 31, 2026 – Jan 3, 2027.
            </p>
          </div>

          {/* Links column */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Quick Links</h3>
            <ul className="space-y-2" aria-label="Quick links">
              <li>
                <Link href="/register" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Pre-Register — $40
                </Link>
              </li>
              <li>
                <a
                  href={HOTEL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Book Hotel <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={NECYPAA_ADVISORY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  NECYPAA Advisory Council <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="#purpose" className="text-sm text-gray-300 hover:text-white transition-colors">
                  About NECYPAA
                </Link>
              </li>
              <li>
                <Link href="#meetings" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Young People's Meetings in CT
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Contact</h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "var(--nec-cyan)" }} />
              {CONTACT_EMAIL}
            </a>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs pt-1">
              Questions about registration, hotel, accessibility, or anything else — reach out any time.
            </p>
          </div>
        </div>

        {/* Accessibility statement */}
        <div
          className="mt-10 pt-6 border-t text-xs text-gray-500 leading-relaxed"
          style={{ borderColor: "rgba(42,53,82,0.5)" }}
        >
          <p className="max-w-2xl">
            <strong className="text-gray-400">Accessibility:</strong>{" "}
            NECYPAA XXXVI is committed to digital accessibility for people of all abilities.
            This site targets WCAG 2.1 Level AAA wherever achievable, with Level AA as our minimum.{" "}
            <Link href="/accessibility" className="underline text-gray-400 hover:text-white transition-colors">
              Accessibility page
            </Link>{" · "}
            <a
              href="mailto:info@necypaa.org?subject=Accessibility%20Issue"
              className="underline text-gray-400 hover:text-white transition-colors"
            >
              Report a problem
            </a>
          </p>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600"
          style={{ borderColor: "rgba(42,53,82,0.5)" }}
        >
          <p>
            © {new Date().getFullYear()} NECYPAA XXXVI CT Host Committee · All rights reserved.
          </p>
          <p className="text-center">
            Northeast Convention of Young People in Alcoholics Anonymous
          </p>
        </div>

        {/* AA trademark acknowledgment (required per Tradition compliance) */}
        <p className="mt-3 text-center text-[10px] text-gray-700 leading-relaxed">
          Alcoholics Anonymous®, A.A.®, and The Big Book® are registered trademarks of Alcoholics Anonymous World Services, Inc.
        </p>
      </div>
    </footer>
  )
}
