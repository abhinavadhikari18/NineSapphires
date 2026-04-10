import { NextResponse } from "next/server"
import { assertAdminToken } from "@/lib/admin-auth"
import { addReviewItem, readSiteContent } from "@/lib/content-store"

export const runtime = "nodejs"

export async function GET() {
  const content = await readSiteContent()
  return NextResponse.json(content.reviews)
}

export async function POST(req: Request) {
  const unauthorized = assertAdminToken(req)
  if (unauthorized) return unauthorized

  try {
    const body = (await req.json()) as {
      name?: string
      role?: string
      rating?: number
      review?: string
      avatar?: string
    }

    if (!body.name || !body.role || !body.review || !body.avatar) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const ratingValue = Number(body.rating)
    if (!Number.isFinite(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 })
    }

    const created = await addReviewItem({
      name: body.name,
      role: body.role,
      rating: ratingValue,
      review: body.review,
      avatar: body.avatar,
    })
    return NextResponse.json(created, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create review." }, { status: 500 })
  }
}
