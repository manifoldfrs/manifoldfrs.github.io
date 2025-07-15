import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  url?: string
  image?: string
  type?: 'website' | 'article'
  publishedAt?: string
  modifiedAt?: string
}

const defaultMeta = {
  title: 'Faris',
  description: 'An Esoteric Garden',
  url: 'https://manifoldfrs.github.io',
  image: '/assets/images/chicago_talk_2024.jpg',
  type: 'website' as const,
}

export default function SEO({
  title,
  description = defaultMeta.description,
  url = defaultMeta.url,
  image = defaultMeta.image,
  type = 'website',
  publishedAt,
  modifiedAt,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${defaultMeta.title}` : defaultMeta.title
  const fullUrl = url.startsWith('http') ? url : `${defaultMeta.url}${url}`
  const fullImage = image.startsWith('http') ? image : `${defaultMeta.url}${image}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={defaultMeta.title} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@frshbb" />
      
      {/* Article specific */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && modifiedAt && (
        <meta property="article:modified_time" content={modifiedAt} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
      
      {/* RSS Feed */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${defaultMeta.title} RSS Feed`}
        href="/feed.xml"
      />
    </Head>
  )
}