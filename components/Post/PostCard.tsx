import Link from 'next/link'
import { PostMeta } from '@/lib/posts'
import { capitalizeFirst, formatDate } from '@/lib/utils-client'

interface PostCardProps {
  post: PostMeta
}

export default function PostCard({ post }: PostCardProps) {
  // Create URL from date components
  const postUrl = `/${post.year}/${post.month}/${post.day}/${post.titleSlug}`

  return (
    <article className="post-card">
      <div className="space-y-3">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="inline-block bg-nord-3 text-text-primary px-2 py-1 rounded text-xs hover:bg-primary hover:text-background-dark transition-colors"
              >
                {capitalizeFirst(category)}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-semibold">
          <Link
            href={postUrl}
            className="text-text-primary hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-text-secondary leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Date */}
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <time dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          
          <Link
            href={postUrl}
            className="text-links hover:text-primary transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}