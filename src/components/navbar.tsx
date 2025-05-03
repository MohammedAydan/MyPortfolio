"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"

interface NavbarProps {
  locale: string
  dict?: {
    about: string
    skills: string
    projects: string
    contact: string
    education: string
    success: string
  }
}

export default function Navbar({ locale }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isRtl = locale === "ar";
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? "border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={`/${locale}`} className="text-xl font-bold">
          Mohammed Aydan
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center space-x-1 md:flex">
          <NavLink href="#about" label={t("navigation.about")} isScrolled={isScrolled} />
          <NavLink href="#education" label={t("navigation.education")} isScrolled={isScrolled} />
          <NavLink href="#success" label={t("navigation.success")} isScrolled={isScrolled} />
          <NavLink href="#skills" label={t("navigation.skills")} isScrolled={isScrolled} />
          <NavLink href="#projects" label={t("navigation.projects")} isScrolled={isScrolled} />
          <NavLink href="#contact" label={t("navigation.contact")} isScrolled={isScrolled} />
        </nav>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${isScrolled ? "" : "text-white hover:bg-white/20 hover:text-white"}`}
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Switch language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRtl ? "start" : "end"}>
              <Link href={"en"} ><DropdownMenuItem>English</DropdownMenuItem></Link>
              <Link href={"ar"} ><DropdownMenuItem>العربية</DropdownMenuItem></Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme toggle */}
          <ModeToggle isScrolled={isScrolled} />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className={`rounded-full ${isScrolled ? "" : "text-white hover:bg-white/20 hover:text-white"}`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="border-t bg-background p-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink href="#about" label={t("navigation.about")} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="#education" label={t("navigation.education")} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="#success" label={t("navigation.success")} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="#skills" label={t("navigation.skills")} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="#projects" label={t("navigation.projects")} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="#contact" label={t("navigation.contact")} onClick={() => setIsMenuOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, label, isScrolled = true }: { href: string; label: string; isScrolled?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "hover:text-primary" : "text-white hover:text-white/80"
        }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-[2px] w-0 transition-all group-hover:w-full ${isScrolled ? "bg-primary" : "bg-white"
          }`}
      ></span>
    </Link>
  )
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
      onClick={onClick}
    >
      {label}
    </Link>
  )
}
