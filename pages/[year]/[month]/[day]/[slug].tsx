import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { PostData } from '@/lib/posts'
import { capitalizeFirst, readingTime, formatDate } from '@/lib/utils-client'

interface PostProps {
  post: PostData
}

export default function Post({ post }: PostProps) {
  const postUrl = `/${post.slug.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, '/')}`

  return (
    <Layout
      title={post.title}
      description={post.excerpt}
      url={postUrl}
      type="article"
      publishedAt={post.date}
    >
      <article className="max-w-3xl mx-auto">
        {/* Post Header */}
        <header className="mb-8 text-center">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {post.categories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category.toLowerCase()}`}
                  className="inline-block bg-nord-3 text-text-primary px-3 py-1 rounded text-sm hover:bg-primary hover:text-background-dark transition-colors"
                >
                  {capitalizeFirst(category)}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {post.title}
          </h1>

          <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <span>•</span>
            <span>{readingTime(post.content)} min read</span>
          </div>
        </header>

        {/* Post Content */}
        <div 
          className="prose prose-nord max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Post Footer */}
        <footer className="mt-12 pt-8 border-t border-nord-3">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="text-links hover:text-primary transition-colors"
            >
              ← Back to Blog
            </Link>
            
            {/* Share links could go here */}
          </div>
        </footer>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllPostIds } = await import('@/lib/posts')
  const paths = getAllPostIds()
  
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.year || !params.month || !params.day || !params.slug) {
    return {
      notFound: true,
    }
  }

  const { getPostData } = await import('@/lib/posts')
  const post = await getPostData(
    params.year as string,
    params.month as string,
    params.day as string,
    params.slug as string
  )
  
  return {
    props: {
      post,
    },
  }
}