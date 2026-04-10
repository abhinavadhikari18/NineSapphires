"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#reviews", label: "Reviews" },
  { href: "#about", label: "About" },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0" aria-label="NineSapphires home">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NineSapphires-Photoroom-bkieLh8dIYGnTHPUy8lTb3LvgjPQRR.png"
            alt="NineSapphires logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="font-serif font-bold text-base text-foreground hidden sm:block tracking-tight">
            NineSapphires
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border hover:border-primary/40 hover:text-primary transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <a
            href="tel:9766837377"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium glow-btn"
            aria-label="Contact now by phone"
          >
            Contact Now
          </a>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-background/95 backdrop-blur-md border-t border-border`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-primary py-3 border-b border-border/40 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:9766837377"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex justify-center items-center px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium glow-btn"
            aria-label="Contact now by phone"
          >
            Contact Now
          </a>
        </nav>
      </div>
    </header>
  )
}
