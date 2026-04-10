"use client"

import { FormEvent, useEffect, useState } from "react"
import type { PortfolioItem, ReviewItem } from "@/lib/content-types"

type PortfolioForm = {
  title: string
  category: string
  image: string
  url: string
  description: string
}

type ReviewForm = {
  name: string
  role: string
  rating: string
  review: string
  avatar: string
}

const EMPTY_PORTFOLIO_FORM: PortfolioForm = {
  title: "",
  category: "",
  image: "",
  url: "",
  description: "",
}

const EMPTY_REVIEW_FORM: ReviewForm = {
  name: "",
  role: "",
  rating: "5",
  review: "",
  avatar: "",
}

export default function AdminPage() {
  const [token, setToken] = useState("")
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [portfolioForm, setPortfolioForm] = useState<PortfolioForm>(EMPTY_PORTFOLIO_FORM)
  const [reviewForm, setReviewForm] = useState<ReviewForm>(EMPTY_REVIEW_FORM)
  const [status, setStatus] = useState("")

  const loadData = async () => {
    const [portfolioRes, reviewsRes] = await Promise.all([
      fetch("/api/content/portfolio", { cache: "no-store" }),
      fetch("/api/content/reviews", { cache: "no-store" }),
    ])

    if (portfolioRes.ok) {
      const data = (await portfolioRes.json()) as PortfolioItem[]
      setPortfolio(data)
    }
    if (reviewsRes.ok) {
      const data = (await reviewsRes.json()) as ReviewItem[]
      setReviews(data)
    }
  }

  useEffect(() => {
    void loadData()
  }, [])

  const adminHeaders = token ? { "x-admin-token": token, "Content-Type": "application/json" } : null

  const submitPortfolio = async (e: FormEvent) => {
    e.preventDefault()
    if (!adminHeaders) return setStatus("Enter admin token first.")

    const res = await fetch("/api/content/portfolio", {
      method: "POST",
      headers: adminHeaders,
      body: JSON.stringify(portfolioForm),
    })
    const payload = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) return setStatus(payload.error || "Failed to add portfolio item.")

    setStatus("Portfolio item added.")
    setPortfolioForm(EMPTY_PORTFOLIO_FORM)
    await loadData()
  }

  const submitReview = async (e: FormEvent) => {
    e.preventDefault()
    if (!adminHeaders) return setStatus("Enter admin token first.")

    const res = await fetch("/api/content/reviews", {
      method: "POST",
      headers: adminHeaders,
      body: JSON.stringify({
        ...reviewForm,
        rating: Number(reviewForm.rating),
      }),
    })
    const payload = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) return setStatus(payload.error || "Failed to add review.")

    setStatus("Review added.")
    setReviewForm(EMPTY_REVIEW_FORM)
    await loadData()
  }

  const deletePortfolio = async (id: string) => {
    if (!adminHeaders) return setStatus("Enter admin token first.")
    const res = await fetch(`/api/content/portfolio/${id}`, {
      method: "DELETE",
      headers: adminHeaders,
    })
    const payload = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) return setStatus(payload.error || "Failed to delete portfolio item.")
    setStatus("Portfolio item deleted.")
    await loadData()
  }

  const deleteReview = async (id: string) => {
    if (!adminHeaders) return setStatus("Enter admin token first.")
    const res = await fetch(`/api/content/reviews/${id}`, {
      method: "DELETE",
      headers: adminHeaders,
    })
    const payload = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) return setStatus(payload.error || "Failed to delete review.")
    setStatus("Review deleted.")
    await loadData()
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="font-serif text-3xl font-bold">Admin Content Manager</h1>
        <p className="text-sm text-muted-foreground">
          Manage portfolio and reviews here. Set `ADMIN_TOKEN` in `.env.local` and use it below.
        </p>

        <div className="glass-card rounded-xl p-5 space-y-2">
          <label className="text-xs uppercase tracking-wide text-muted-foreground">Admin Token</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border text-sm"
            placeholder="Enter ADMIN_TOKEN"
          />
        </div>

        {status && <p className="text-sm text-primary">{status}</p>}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={submitPortfolio} className="glass-card rounded-xl p-5 space-y-3">
            <h2 className="font-serif text-xl">Add Portfolio Item</h2>
            <input className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm" placeholder="Title" value={portfolioForm.title} onChange={(e) => setPortfolioForm((s) => ({ ...s, title: e.target.value }))} />
            <input className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm" placeholder="Category" value={portfolioForm.category} onChange={(e) => setPortfolioForm((s) => ({ ...s, category: e.target.value }))} />
            <input className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm" placeholder="Image URL or path" value={portfolioForm.image} onChange={(e) => setPortfolioForm((s) => ({ ...s, image: e.target.value }))} />
            <input className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm" placeholder="Visit URL" value={portfolioForm.url} onChange={(e) => setPortfolioForm((s) => ({ ...s, url: e.target.value }))} />
            <textarea className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm" rows={3} placeholder="Description" value={portfolioForm.description} onChange={(e) => setPortfolioForm((s) => ({ ...s, description: e.target.value }))} />
            <button type="submit" className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">Add Portfolio</button>
          </form>

          <form onSubmit={submitReview} className="glass-card rounded-xl p-5 space-y-3">
            <h2 className="font-serif text-xl">Add Review</h2>
            <input className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm" placeholder="Name" value={reviewForm.name} onChange={(e) => setReviewForm((s) => ({ ...s, name: e.target.value }))} />
            <input className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm" placeholder="Role" value={reviewForm.role} onChange={(e) => setReviewForm((s) => ({ ...s, role: e.target.value }))} />
            <input className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm" placeholder="Avatar initials (e.g. AB)" value={reviewForm.avatar} onChange={(e) => setReviewForm((s) => ({ ...s, avatar: e.target.value.toUpperCase() }))} />
            <input className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm" type="number" min={1} max={5} placeholder="Rating 1-5" value={reviewForm.rating} onChange={(e) => setReviewForm((s) => ({ ...s, rating: e.target.value }))} />
            <textarea className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm" rows={3} placeholder="Review text" value={reviewForm.review} onChange={(e) => setReviewForm((s) => ({ ...s, review: e.target.value }))} />
            <button type="submit" className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">Add Review</button>
          </form>
        </section>

        <section className="glass-card rounded-xl p-5 space-y-3">
          <h2 className="font-serif text-xl">Portfolio Items ({portfolio.length})</h2>
          <div className="space-y-2">
            {portfolio.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 border border-border rounded-lg px-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.url}</p>
                </div>
                <button onClick={() => void deletePortfolio(item.id)} className="text-xs px-3 py-1 rounded-full border border-red-500/40 text-red-500 hover:bg-red-500/10">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card rounded-xl p-5 space-y-3">
          <h2 className="font-serif text-xl">Reviews ({reviews.length})</h2>
          <div className="space-y-2">
            {reviews.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 border border-border rounded-lg px-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.name} ({item.rating}/5)
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{item.role}</p>
                </div>
                <button onClick={() => void deleteReview(item.id)} className="text-xs px-3 py-1 rounded-full border border-red-500/40 text-red-500 hover:bg-red-500/10">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
