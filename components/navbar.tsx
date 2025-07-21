"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Branches",
    href: "/branches",
    submenu: [
      { name: "Computer Engineering", href: "/branches/computer" },
      { name: "ENTC Engineering", href: "/branches/entc" },
      { name: "Automation & Robotics", href: "/branches/robotics" },
      { name: "Mechanical Engineering", href: "/branches/mechanical" },
    ],
  },
  { name: "Calculator", href: "/calculator" },
  { name: "Chat", href: "/chat" },
  { name: "Jobs", href: "/jobs" },
  { name: "Campus Tour", href: "/campus-tour" },
  { name: "Events", href: "/events" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)

    // Get user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Enhanced Logo - Single Line */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
            <div className="relative">
              <Image
                src="/images/mescoe-logo.png"
                alt="MESCOE Logo"
                width={40}
                height={40}
                className="relative drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center">
              <span className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                MESCOE Connect
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-slate-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-1 py-2 px-3 rounded-lg hover:bg-blue-50"
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>

                {item.submenu && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 py-3 min-w-[220px]">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 mx-2 rounded-lg"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                  <User className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-slate-700 max-w-32 truncate">{user.email}</span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-6 py-2 rounded-xl shadow-sm transform hover:scale-105 transition-all duration-300">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-800 hover:bg-slate-100">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] bg-white/95 backdrop-blur-md border-slate-200">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center space-x-3 pb-6 border-b border-slate-200">
                  <Image src="/images/mescoe-logo.png" alt="MESCOE Logo" width={35} height={35} />
                  <div>
                    <div className="font-black text-xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      MESCOE Connect
                    </div>
                  </div>
                </div>

                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-600 hover:text-blue-600 transition-colors font-medium py-3 px-4 block border-b border-slate-100 hover:bg-blue-50 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="pl-6 space-y-2 mt-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm text-slate-500 hover:text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-50 transition-all duration-200"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {user ? (
                  <div className="pt-6 border-t border-slate-200 space-y-4">
                    <div className="text-sm text-slate-500">Signed in as:</div>
                    <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                      <User className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-slate-700 truncate">{user.email}</span>
                    </div>
                    <Button
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link href="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-sm mt-6">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
