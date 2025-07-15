import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import { PostCard } from '@/components/Post'
import { PostMeta } from '@/lib/posts'
import { capitalizeFirst } from '@/lib/utils-client'

interface CategoryProps {
  category: string
  posts: PostMeta[]
}

export default function Category({ category, posts }: CategoryProps) {
  const categoryDisplay = capitalizeFirst(category)

  return (
    <Layout
      title={`${categoryDisplay} Posts`}
      description={`All posts in the ${categoryDisplay} category`}
      url={`/categories/${category}`}
    >
      <div className="space-y-8">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {categoryDisplay}
          </h1>
          <p className="text-text-secondary">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
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
              <p className="text-text-secondary">No posts in this category yet.</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllCategories } = await import('@/lib/posts')
  const categories = getAllCategories()
  
  const paths = categories.map((category) => ({
    params: { category }
  }))
  
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.category) {
    return {
      notFound: true,
    }
  }

  const { getPostsByCategory } = await import('@/lib/posts')
  const category = params.category as string
  const posts = getPostsByCategory(category)
  
  return {
    props: {
      category,
      posts,
    },
  }
}