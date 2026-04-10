"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"
import type { ReviewItem } from "@/lib/content-types"

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "review-1",
    name: "Bishnu Pandey",
    role: "Owner, Gurans Momos",
    rating: 5,
    review:
      "NineSapphires completely transformed our online presence. Our sales increased by 40% within the first month. The design is breathtaking — our customers keep complimenting it.",
    avatar: "BP",
  },
  {
    id: "review-2",
    name: "Priya Maharjan",
    role: "Director, Summit Consulting",
    rating: 5,
    review:
      "Professional, elegant, and delivered exactly on time. The team understood our brand language perfectly. Our clients frequently mention how impressive our website looks.",
    avatar: "PM",
  },
  {
    id: "review-3",
    name: "Rohan Thapa",
    role: "Founder, Iron Peak Fitness",
    rating: 5,
    review:
      "The energy they captured in our website is exactly what we needed. Membership sign-ups went up significantly after the launch. Absolutely worth every rupee.",
    avatar: "RT",
  },
  {
    id: "review-4",
    name: "Sita Gurung",
    role: "Owner, Bloom Salon & Spa",
    rating: 5,
    review:
      "I was blown away by the final result. The website feels luxurious and modern. My clients always ask who built it. NineSapphires exceeded all my expectations.",
    avatar: "SG",
  },
  {
    id: "review-5",
    name: "Deepak Rai",
    role: "Manager, Everest Resort",
    rating: 5,
    review:
      "The Premium package was the best investment we made. A full backend, seamless booking, and a design that does justice to our resort. Truly world-class quality.",
    avatar: "DR",
  },
  {
    id: "review-6",
    name: "Anjali Tamang",
    role: "Owner, Rani Boutique",
    rating: 5,
    review:
      "From the initial consultation to the final delivery, everything was smooth and transparent. The website speaks the language of fashion beautifully. Highly recommended!",
    avatar: "AT",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-accent fill-accent" : "text-muted-foreground"}
        />
      ))}
    </div>
  )
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

function ReviewCard({ review, index }: { review: ReviewItem; index: number }) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className="glass-card rounded-2xl p-6 flex flex-col gap-4 sapphire-card-hover"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Review text */}
      <p className="text-sm leading-relaxed text-muted-foreground flex-1">
        &ldquo;{review.review}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-border/50">
        <div
          className="w-9 h-9 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center shrink-0 border border-primary/20"
          aria-hidden="true"
        >
          {review.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground font-serif">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.role}</p>
        </div>
      </div>
    </div>
  )
}

export function RatingsSection() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2)
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS)
  const avgRating = 5.0

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/content/reviews", { cache: "no-store" })
        if (!response.ok) return
        const data = (await response.json()) as ReviewItem[]
        if (Array.isArray(data)) {
          setReviews(data)
        }
      } catch {
        // Keep fallback static reviews on fetch failure.
      }
    }
    void load()
  }, [])

  return (
    <section id="reviews" className="py-24 px-6 bg-muted/40 relative overflow-hidden">
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-48 pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse, #2563EB 0%, transparent 70%)" }}
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
            What Clients Say
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Client Reviews
          </h2>
          <div className="gold-divider mx-auto" aria-hidden="true" />

          {/* Average rating display */}
          <div className="mt-8 inline-flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="text-accent fill-accent"
                  style={{ filter: "drop-shadow(0 0 6px rgba(201,168,76,0.7))" }}
                />
              ))}
            </div>
            <p className="text-3xl font-serif font-bold text-foreground">
              {avgRating.toFixed(1)}{" "}
              <span className="text-sm font-sans font-normal text-muted-foreground">
                / 5.0
              </span>
            </p>
            <p className="text-xs text-muted-foreground tracking-wide">
              Based on {reviews.length} verified client reviews
            </p>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
