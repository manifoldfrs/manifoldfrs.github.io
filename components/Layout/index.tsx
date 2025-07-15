import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  url?: string
  image?: string
  type?: 'website' | 'article'
  publishedAt?: string
  modifiedAt?: string
  className?: string
}

export default function Layout({
  children,
  title,
  description,
  url,
  image,
  type,
  publishedAt,
  modifiedAt,
  className = '',
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <SEO
        title={title}
        description={description}
        url={url}
        image={image}
        type={type}
        publishedAt={publishedAt}
        modifiedAt={modifiedAt}
      />
      
      <Header />
      
      <main 
        className={`container flex-1 py-8 ${className}`}
        id="main-content"
        tabIndex={-1}
      >
        {children}
      </main>
      
      <Footer />
    </div>
  )
}