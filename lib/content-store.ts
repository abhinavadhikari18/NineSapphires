import { promises as fs } from "fs"
import path from "path"
import { randomUUID } from "crypto"
import type { PortfolioItem, ReviewItem, SiteContent } from "@/lib/content-types"

const DATA_PATH = path.join(process.cwd(), "data", "site-content.json")

const EMPTY_CONTENT: SiteContent = {
  portfolio: [],
  reviews: [],
}

async function ensureDataFile() {
  const dir = path.dirname(DATA_PATH)
  await fs.mkdir(dir, { recursive: true })
  try {
    await fs.access(DATA_PATH)
  } catch {
    await fs.writeFile(DATA_PATH, JSON.stringify(EMPTY_CONTENT, null, 2), "utf8")
  }
}

export async function readSiteContent(): Promise<SiteContent> {
  await ensureDataFile()
  const raw = await fs.readFile(DATA_PATH, "utf8")
  const parsed = JSON.parse(raw) as Partial<SiteContent>
  return {
    portfolio: Array.isArray(parsed.portfolio) ? parsed.portfolio : [],
    reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [],
  }
}

async function writeSiteContent(content: SiteContent) {
  await fs.writeFile(DATA_PATH, JSON.stringify(content, null, 2), "utf8")
}

export async function addPortfolioItem(
  input: Omit<PortfolioItem, "id">
): Promise<PortfolioItem> {
  const content = await readSiteContent()
  const newItem: PortfolioItem = { id: randomUUID(), ...input }
  content.portfolio.unshift(newItem)
  await writeSiteContent(content)
  return newItem
}

export async function removePortfolioItem(id: string) {
  const content = await readSiteContent()
  const next = content.portfolio.filter((item) => item.id !== id)
  const changed = next.length !== content.portfolio.length
  if (changed) {
    content.portfolio = next
    await writeSiteContent(content)
  }
  return changed
}

export async function addReviewItem(input: Omit<ReviewItem, "id">): Promise<ReviewItem> {
  const content = await readSiteContent()
  const newItem: ReviewItem = { id: randomUUID(), ...input }
  content.reviews.unshift(newItem)
  await writeSiteContent(content)
  return newItem
}

export async function removeReviewItem(id: string) {
  const content = await readSiteContent()
  const next = content.reviews.filter((item) => item.id !== id)
  const changed = next.length !== content.reviews.length
  if (changed) {
    content.reviews = next
    await writeSiteContent(content)
  }
  return changed
}
