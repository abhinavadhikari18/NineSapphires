import { NextResponse } from "next/server"
import { assertAdminToken } from "@/lib/admin-auth"
import { removeReviewItem } from "@/lib/content-store"

export const runtime = "nodejs"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = assertAdminToken(req)
  if (unauthorized) return unauthorized

  const { id } = await params
  const removed = await removeReviewItem(id)

  if (!removed) {
    return NextResponse.json({ error: "Review not found." }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}
