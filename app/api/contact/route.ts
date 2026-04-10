import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

type ContactPayload = {
  name?: string
  email?: string
  message?: string
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = (await req.json()) as ContactPayload

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const to = process.env.CONTACT_TO_EMAIL || "ninesapphires09@gmail.com"
    const secure = process.env.SMTP_SECURE === "true"

    if (!host || !user || !pass) {
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"NineSapphires Website" <${user}>`,
      to,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : "Failed to send message"
    const lower = rawMessage.toLowerCase()

    if (lower.includes("535") || lower.includes("eauth") || lower.includes("username and password not accepted")) {
      return NextResponse.json(
        {
          error:
            "Gmail authentication failed. Use your Gmail address in SMTP_USER and a Google App Password in SMTP_PASS.",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ error: rawMessage }, { status: 500 })
  }
}
