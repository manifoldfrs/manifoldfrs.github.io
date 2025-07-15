import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const portfolioDirectory = path.join(process.cwd(), 'jekyll-backup/_portfolio')

export interface PortfolioData {
  slug: string
  title: string
  description?: string
  image?: string
  technologies?: string[]
  liveUrl?: string
  repoUrl?: string
  content: string
  featured?: boolean
}

export interface PortfolioMeta {
  slug: string
  title: string
  description?: string
  image?: string
  technologies?: string[]
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export function getSortedPortfolioData(): PortfolioMeta[] {
  // Check if portfolio directory exists
  if (!fs.existsSync(portfolioDirectory)) {
    return []
  }

  // Get file names under _portfolio
  const fileNames = fs.readdirSync(portfolioDirectory)
  const allPortfolioData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(portfolioDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the portfolio metadata section
      const matterResult = matter(fileContents)

      return {
        slug,
        title: matterResult.data.title,
        description: matterResult.data.description,
        image: matterResult.data.image,
        technologies: matterResult.data.technologies || [],
        liveUrl: matterResult.data.live_url || matterResult.data.liveUrl,
        repoUrl: matterResult.data.repo_url || matterResult.data.repoUrl,
        featured: matterResult.data.featured || false
      }
    })

  // Sort by featured first, then by title
  return allPortfolioData.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.title.localeCompare(b.title)
  })
}

export function getAllPortfolioIds() {
  // Check if portfolio directory exists
  if (!fs.existsSync(portfolioDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(portfolioDirectory)
  
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, '')
        }
      }
    })
}

export async function getPortfolioData(slug: string): Promise<PortfolioData> {
  const fullPath = path.join(portfolioDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the portfolio metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  let contentHtml = processedContent.toString()
  
  // Fix image paths from Jekyll format to Next.js format
  contentHtml = contentHtml.replace(/\/assets\/images\//g, '/images/')

  // Combine the data with the slug
  return {
    slug,
    title: matterResult.data.title,
    description: matterResult.data.description,
    image: matterResult.data.image,
    technologies: matterResult.data.technologies || [],
    liveUrl: matterResult.data.live_url || matterResult.data.liveUrl,
    repoUrl: matterResult.data.repo_url || matterResult.data.repoUrl,
    content: contentHtml,
    featured: matterResult.data.featured || false
  }
}