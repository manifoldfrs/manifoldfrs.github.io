import { GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import { PostCard } from '@/components/Post'
import { PostMeta } from '@/lib/posts'

interface BlogProps {
  posts: PostMeta[]
}

export default function Blog({ posts }: BlogProps) {
  return (
    <Layout
      title="Blog"
      description="All blog posts - thoughts, insights, and musings"
      url="/blog"
    >
      <div className="space-y-8">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Blog
          </h1>
          <p className="text-text-secondary">
            Thoughts, insights, and musings
          </p>
        </section>

        {/* Posts */}
        <section>
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          
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