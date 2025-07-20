// Centralized configuration
export const config = {
  // API Configuration
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    timeout: 30000,
    useAPI: process.env.NEXT_PUBLIC_USE_API === 'true',
  },
  
  // AWS Configuration
  aws: {
    cdnURL: process.env.NEXT_PUBLIC_CDN_URL || '',
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
  },
  
  // Site Configuration
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://manifoldfrs.github.io',
    title: 'Faris',
    description: 'Personal blog and thoughts by Faris Habib',
    author: 'Faris Habib',
    social: {
      github: 'https://github.com/manifoldfrs',
      twitter: 'https://x.com/frshbb',
      linkedin: 'https://linkedin.com/in/farishabib',
      substack: 'https://frshbb.substack.com',
    },
  },
  
  // Feature Flags
  features: {
    comments: process.env.NEXT_PUBLIC_ENABLE_COMMENTS === 'true',
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    search: process.env.NEXT_PUBLIC_ENABLE_SEARCH === 'true',
  },
  
  // Pagination
  pagination: {
    postsPerPage: 10,
    archivePostsPerPage: 20,
  },
};

export default config;