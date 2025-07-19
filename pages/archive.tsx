import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/utils-client'

interface ArchiveProps {
  posts: PostMeta[]
}

interface PostsByYear {
  [year: string]: PostMeta[]
}

export default function Archive({ posts }: ArchiveProps) {
  // Group posts by year
  const postsByYear = posts.reduce<PostsByYear>((acc, post) => {
    let year: string
    try {
      const date = new Date(post.date)
      if (isNaN(date.getTime())) {
        // If date is invalid, try to use the year from the post metadata
        year = post.year || 'Unknown'
      } else {
        year = date.getFullYear().toString()
      }
    } catch (error) {
      // Fallback to year from post metadata or 'Unknown'
      year = post.year || 'Unknown'
    }
    
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {})

  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <Layout
      title="Archive"
      description="Complete archive of all blog posts"
      url="/archive"
    >
      <div className="space-y-8">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Archive
          </h1>
          <p className="text-text-secondary">
            Complete archive of all {posts.length} posts
          </p>
        </section>

        {/* Posts by Year */}
        <section className="max-w-3xl mx-auto">
          {years.map((year) => (
            <div key={year} className="mb-12">
              <h2 className="text-2xl font-semibold text-text-primary mb-6 pb-2 border-b border-nord-3">
                {year}
              </h2>
              
              <div className="space-y-4">
                {postsByYear[year].map((post) => {
                  const postUrl = `/${post.year}/${post.month}/${post.day}/${post.titleSlug}`
                  
                  return (
                    <article key={post.slug} className="flex flex-col sm:flex-row sm:items-center gap-4 py-3 border-b border-nord-1 last:border-b-0">
                      <time 
                        dateTime={post.date}
                        className="text-text-secondary text-sm sm:w-24 flex-shrink-0"
                      >
                        {(() => {
                          const formatted = formatDate(post.date)
                          // Only remove year if the date was formatted successfully
                          if (formatted !== 'Invalid date' && formatted !== 'Date error' && formatted !== 'No date') {
                            return formatted.replace(`, ${year}`, '')
                          }
                          return formatted
                        })()}
                      </time>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium">
                          <Link
                            href={postUrl}
                            className="text-text-primary hover:text-primary transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.categories.map((category) => (
                              <span
                                key={category}
                                className="inline-block bg-nord-3 text-text-primary px-2 py-0.5 rounded text-xs"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No posts yet.</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { getSortedPostsData } = await import('@/lib/posts')
  const posts = getSortedPostsData()
  
  return {
    props: {
      posts,
    },
  }
}