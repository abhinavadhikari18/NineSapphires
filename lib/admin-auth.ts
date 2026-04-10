import { NextResponse } from "next/server"

export function assertAdminToken(req: Request) {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN is not configured on server." },
      { status: 500 }
    )
  }

  const actual = req.headers.get("x-admin-token")
  if (!actual || actual !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return null
}
