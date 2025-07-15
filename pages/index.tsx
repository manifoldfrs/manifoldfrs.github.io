import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { PostCard } from '@/components/Post'
import { PostMeta } from '@/lib/posts'

interface HomeProps {
  posts: PostMeta[]
}

export default function Home({ posts }: HomeProps) {
  const recentPosts = posts.slice(0, 5) // Show latest 5 posts

  return (
    <Layout
      title="Home"
      description="An Esoteric Garden - Personal blog and thoughts by Faris Habib"
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-4">
            Faris
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            An Esoteric Garden
          </p>
        </section>

        {/* Recent Posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-text-primary">
              Recent Posts
            </h2>
            <Link
              href="/blog"
              className="text-links hover:text-primary transition-colors"
            >
              View all posts →
            </Link>
          </div>
          
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
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