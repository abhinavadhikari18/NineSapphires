export type PortfolioItem = {
  id: string
  title: string
  category: string
  image: string
  url: string
  description: string
}

export type ReviewItem = {
  id: string
  name: string
  role: string
  rating: number
  review: string
  avatar: string
}

export type SiteContent = {
  portfolio: PortfolioItem[]
  reviews: ReviewItem[]
}
