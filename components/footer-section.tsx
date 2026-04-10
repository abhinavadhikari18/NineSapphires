"use client"

import Image from "next/image"
import { Phone, Mail, Facebook, Instagram, Linkedin, Send } from "lucide-react"
import { useState } from "react"

const SOCIAL_LINKS = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/ninesapphires",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/ninesapphires",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/ninesapphires",
  },
]

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#reviews", label: "Reviews" },
  { href: "#about", label: "About" },
]

export function FooterSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendError, setSendError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setSendError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error || "Failed to send message")
      }

      setSubmitted(true)
      setFormState({ name: "", email: "", message: "" })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not send message right now."
      setSendError(message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Top BG decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 w-64 h-64 rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Contact CTA banner */}
      <div className="border-b border-white/10 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact info */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-medium text-accent mb-3">
              Let&apos;s Connect
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary-foreground mb-6 text-balance">
              Ready to Refine Your Digital Identity?
            </h2>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed mb-10 max-w-md">
              Whether you&apos;re launching a new venture or elevating an existing
              brand, we&apos;re here to craft something extraordinary. Reach out and
              let&apos;s begin.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent/60 group-hover:text-accent transition-colors">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs text-secondary-foreground/50 uppercase tracking-wide">Phone</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-secondary-foreground/90">
                    <a
                      href="tel:9766837377"
                      className="hover:text-accent transition-colors"
                      aria-label="Call 9766837377"
                    >
                      9766837377
                    </a>
                    <span className="text-secondary-foreground/50">/</span>
                    <a
                      href="tel:9827532175"
                      className="hover:text-accent transition-colors"
                      aria-label="Call 9827532175"
                    >
                      9827532175
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ninesapphires09@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
                aria-label="Email NineSapphires"
              >
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent/60 group-hover:text-accent transition-colors">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs text-secondary-foreground/50 uppercase tracking-wide">Email</p>
                  <p className="text-sm font-medium text-secondary-foreground/90 group-hover:text-accent transition-colors">
                    ninesapphires09@gmail.com
                  </p>
                </div>
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-8">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`NineSapphires on ${label}`}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-secondary-foreground/60 hover:border-primary/60 hover:text-primary transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="glass-card rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Send size={22} className="text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  Message Sent
                </h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for reaching out. We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                  Send a Message
                </h3>
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-xs text-muted-foreground uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-xs text-muted-foreground uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-xs text-muted-foreground uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="mt-1 inline-flex justify-center items-center gap-2 py-3 px-6 rounded-full bg-primary text-primary-foreground text-sm font-medium glow-btn"
                >
                  <Send size={14} />
                  {isSending ? "Sending..." : "Send Message"}
                </button>
                {sendError && (
                  <p className="text-xs text-red-500 mt-1" role="alert">
                    {sendError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NineSapphires-Photoroom-bkieLh8dIYGnTHPUy8lTb3LvgjPQRR.png"
              alt="NineSapphires logo"
              width={30}
              height={30}
              className="object-contain"
            />
            <span className="font-serif font-semibold text-sm text-secondary-foreground/90">
              NineSapphires
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-secondary-foreground/50 hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-white/10 flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-secondary-foreground/40">
            &copy; NineSapphires. All rights reserved. Unauthorized reproduction or distribution prohibited.
            Licensed for client use only.
          </p>
          <p className="text-xs text-accent/70 font-serif italic">
            NineSapphires by Ab — Finest Website Development, Refined to Perfection.
          </p>
        </div>
      </div>
    </footer>
  )
}
