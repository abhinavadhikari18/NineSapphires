import { NextResponse } from "next/server"
import { assertAdminToken } from "@/lib/admin-auth"
import { addPortfolioItem, readSiteContent } from "@/lib/content-store"

export const runtime = "nodejs"

export async function GET() {
  const content = await readSiteContent()
  return NextResponse.json(content.portfolio)
}

export async function POST(req: Request) {
  const unauthorized = assertAdminToken(req)
  if (unauthorized) return unauthorized

  try {
    const body = (await req.json()) as {
      title?: string
      category?: string
      image?: string
      url?: string
      description?: string
    }

    if (!body.title || !body.category || !body.image || !body.url || !body.description) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const created = await addPortfolioItem({
      title: body.title,
      category: body.category,
      image: body.image,
      url: body.url,
      description: body.description,
    })
    return NextResponse.json(created, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create portfolio item." }, { status: 500 })
  }
}
