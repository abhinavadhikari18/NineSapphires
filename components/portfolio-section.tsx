"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import type { PortfolioItem } from "@/lib/content-types"

const DEFAULT_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "portfolio-1",
    title: "Gurans Momos",
    category: "Restaurant & Café",
    image: "gurans.jpg",
    url: "gurans-momos.web.app",
    description: "Elegant dining website with online reservations and digital menu.",
  },
  {
    id: "portfolio-2",
    title: "Summit Consulting Group",
    category: "Consultancy",
    image: "https://picsum.photos/seed/summit-consult/800/500",
    url: "#",
    description: "Prestige-driven corporate site inspiring trust and credibility.",
  },
  {
    id: "portfolio-3",
    title: "Iron Peak Fitness",
    category: "Gym & Fitness",
    image: "https://picsum.photos/seed/ironpeak-gym/800/500",
    url: "#",
    description: "High-energy fitness brand with membership integration.",
  },
  {
    id: "portfolio-4",
    title: "Bloom Salon & Spa",
    category: "Salon & Boutique",
    image: "https://picsum.photos/seed/bloom-salon/800/500",
    url: "#",
    description: "Chic, minimal design with appointment booking system.",
  },
  {
    id: "portfolio-5",
    title: "Everest Resort & Stay",
    category: "Resort & Hotel",
    image: "https://picsum.photos/seed/everest-resort/800/500",
    url: "#",
    description: "Luxury resort website with multi-room booking and gallery.",
  },
  {
    id: "portfolio-6",
    title: "Rani Boutique",
    category: "Fashion Boutique",
    image: "https://picsum.photos/seed/rani-boutique/800/500",
    url: "#",
    description: "Stylish e-commerce-ready boutique with product showcases.",
  },
]

function getPortfolioHref(url: string) {
  if (!url || url === "#") return "#"
  if (/^https?:\/\//i.test(url)) return url
  return `https://${url}`
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect() }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

function PortfolioCard({
  item,
  index,
}: {
  item: PortfolioItem
  index: number
}) {
  const { ref, inView } = useInView(0.1)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.65s ease ${index * 0.08}s, transform 0.65s ease ${index * 0.08}s`,
        boxShadow: hovered
          ? "0 0 0 1.5px rgba(37,99,235,0.5), 0 20px 50px rgba(37,99,235,0.2)"
          : "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        <Image
          src={item.image}
          alt={`${item.title} website preview`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-400"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(10,20,50,0.92) 0%, rgba(10,20,50,0.4) 60%, transparent 100%)"
              : "linear-gradient(to top, rgba(10,20,50,0.65) 0%, transparent 70%)",
          }}
        >
          <div
            className="transition-all duration-400"
            style={{
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              opacity: hovered ? 1 : 0.9,
            }}
          >
            <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium block mb-1">
              {item.category}
            </span>
            <h3 className="font-serif text-lg font-semibold text-white">{item.title}</h3>

            {hovered && (
              <p className="text-xs text-white/70 mt-2 leading-relaxed">{item.description}</p>
            )}

            {hovered && (
              <a
                href={getPortfolioHref(item.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-white border border-white/30 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label={`Visit ${item.title} website`}
              >
                <ExternalLink size={12} />
                Visit Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PortfolioSection() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2)
  const [items, setItems] = useState<PortfolioItem[]>(DEFAULT_PORTFOLIO_ITEMS)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/content/portfolio", { cache: "no-store" })
        if (!response.ok) return
        const data = (await response.json()) as PortfolioItem[]
        if (Array.isArray(data)) {
          setItems(data)
        }
      } catch {
        // Keep fallback static items on fetch failure.
      }
    }
    void load()
  }, [])

  return (
    <section id="portfolio" className="py-24 px-6 bg-background relative overflow-hidden">
      <div
        className="absolute right-0 bottom-0 w-80 h-80 rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="text-xs tracking-[0.25em] uppercase font-medium text-accent mb-3">
            Our Work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Portfolio
          </h2>
          <div className="gold-divider mx-auto" aria-hidden="true" />
          <p className="mt-6 text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Every pixel crafted with intention. Explore a selection of digital
            experiences we&apos;ve built for our clients.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3.5 rounded-full border border-primary/40 text-primary font-medium text-sm hover:bg-primary/8 transition-colors"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  )
}
