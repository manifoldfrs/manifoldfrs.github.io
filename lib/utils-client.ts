import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function truncate(text: string, length: number = 150): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function readingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function createExcerpt(content: string, length: number = 150): string {
  // Remove markdown syntax and HTML tags
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim()

  return truncate(plainText, length)
}

export function formatDate(dateString: string): string {
  try {
    // Handle empty or invalid date strings
    if (!dateString) {
      return 'No date'
    }
    
    // Extract just the date part (YYYY-MM-DD) from strings like "2025-05-18 15:23:07 -0800"
    const dateMatch = dateString.match(/^(\d{4}-\d{2}-\d{2})/)
    if (dateMatch) {
      // Parse just the date part
      const date = new Date(dateMatch[1] + 'T00:00:00Z')
      if (!isNaN(date.getTime())) {
        return format(date, 'MMMM d, yyyy')
      }
    }
    
    // Fallback: try parsing the full string
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
      return format(date, 'MMMM d, yyyy')
    }
    
    console.error('Invalid date string:', dateString)
    return 'Invalid date'
  } catch (error) {
    console.error('Error formatting date:', dateString, error)
    return 'Date error'
  }
}