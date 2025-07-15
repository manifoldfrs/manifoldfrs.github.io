import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { capitalizeFirst } from '@/lib/utils-client'

interface CategoriesProps {
  categories: Array<{
    name: string
    count: number
  }>
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <Layout
      title="Categories"
      description="Browse blog posts by category"
      url="/categories"
    >
      <div className="space-y-8">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Categories
          </h1>
          <p className="text-text-secondary">
            Browse posts by topic
          </p>
        </section>

        {/* Categories Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.name}`}
                className="block post-card text-center group"
              >
                <h2 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors mb-2">
                  {capitalizeFirst(category.name)}
                </h2>
                <p className="text-text-secondary">
                  {category.count} {category.count === 1 ? 'post' : 'posts'}
                </p>
              </Link>
            ))}
          </div>
          
          {categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No categories yet.</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { getAllCategories, getPostsByCategory } = await import('@/lib/posts')
  const categoryNames = getAllCategories()
  
  const categories = categoryNames.map(name => ({
    name,
    count: getPostsByCategory(name).length
  }))
  
  return {
    props: {
      categories,
    },
  }
}