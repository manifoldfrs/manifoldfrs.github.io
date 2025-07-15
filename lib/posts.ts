import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { format } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'jekyll-backup/_posts')

export interface PostData {
  slug: string
  title: string
  date: string
  categories: string[]
  content: string
  excerpt?: string
  layout?: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  categories: string[]
  excerpt?: string
  year?: string
  month?: string
  day?: string
  titleSlug?: string
}

export function getSortedPostsData(): PostMeta[] {
  // Get file names under _posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Extract date parts from filename (YYYY-MM-DD-title format)
      const dateMatch = fileName.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/)
      const year = dateMatch?.[1]
      const month = dateMatch?.[2]
      const day = dateMatch?.[3]

      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date || `${year}-${month}-${day}`,
        categories: matterResult.data.categories || [],
        excerpt: matterResult.excerpt,
        year,
        month,
        day,
        titleSlug: dateMatch?.[4]
      }
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  
  const paths = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Extract date and title from filename
      const dateMatch = fileName.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/)
      if (dateMatch) {
        const [, year, month, day, titleSlug] = dateMatch
        return {
          params: {
            year,
            month,
            day,
            slug: titleSlug
          }
        }
      }
      return null
    })
    .filter((path): path is { params: { year: string; month: string; day: string; slug: string } } => path !== null)
  
  return paths
}

export async function getPostData(year: string, month: string, day: string, slug: string): Promise<PostData> {
  const fileName = `${year}-${month}-${day}-${slug}.md`
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the slug
  return {
    slug: `${year}-${month}-${day}-${slug}`,
    title: matterResult.data.title,
    date: matterResult.data.date || `${year}-${month}-${day}`,
    categories: matterResult.data.categories || [],
    content: contentHtml,
    excerpt: matterResult.excerpt
  }
}

export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getSortedPostsData()
  return allPosts.filter(post => 
    post.categories.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  )
}

export function getAllCategories(): string[] {
  const allPosts = getSortedPostsData()
  const categories = new Set<string>()
  
  allPosts.forEach(post => {
    post.categories.forEach(category => {
      categories.add(category.toLowerCase())
    })
  })
  
  return Array.from(categories).sort()
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return format(date, 'MMMM d, yyyy')
}