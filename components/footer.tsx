import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* College Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">MESCOE Connect</h3>
            <p className="text-gray-300 mb-4">Modern Education Society's College of Engineering, Pune</p>
            <p className="text-sm text-gray-400">Established 1999 | AICTE & NBA Accredited</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/branches" className="text-gray-300 hover:text-white">
                  Engineering Branches
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-gray-300 hover:text-white">
                  Admission Calculator
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white">
                  Events & Notices
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-white">
                  Merchandise
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mandatory-disclosure" className="text-gray-300 hover:text-white">
                  Mandatory Disclosure
                </Link>
              </li>
              <li>
                <Link href="/anti-ragging" className="text-gray-300 hover:text-white">
                  Anti-Ragging
                </Link>
              </li>
              <li>
                <Link href="/grievance" className="text-gray-300 hover:text-white">
                  Grievance Redressal
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-blue-400" />
                <span className="text-gray-300">
                  19, Late Prin. V. K. Joag Path,
                  <br />
                  Pune 411001, Maharashtra
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+91-7798883400</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">admissions@mescoe.mespune.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">principal@mescoe.mespune.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 MESCOE Connect. All rights reserved. |<span className="text-blue-400"> Powered by NextureX</span> |
            <span className="text-yellow-400"> Built by Rohnit Gitay (ENTC 2025)</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
