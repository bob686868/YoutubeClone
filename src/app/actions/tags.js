import prisma from '../utils'

// ─── getTags ──────────────────────────────────────────────────────────────────
export async function getTags() {
  try {
    let tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
    })
    return { tags, status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to fetch tags' }
  }
}

// ─── addTag ───────────────────────────────────────────────────────────────────
export async function addTag(tagName) {
  if (!tagName?.trim()) return { status: 400, message: 'Tag name is required' }
  try {
    const tag = await prisma.tag.upsert({
      where: { name: tagName.trim() },
      update: {},
      create: { name: tagName.trim() },
    })
    return { tag, status: 201 }
  } catch (error) {
    return { status: 500, message: 'Failed to create tag' }
  }
}
