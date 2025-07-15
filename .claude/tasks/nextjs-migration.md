# Next.js Migration Plan

## Overview
Migrate Jekyll-based personal blog to Next.js with React and Tailwind CSS while preserving existing content, SEO, and design aesthetics.

## Migration Strategy

### Phase 1: Project Setup & Foundation
1. **Initialize Next.js project**
   - Set up Next.js 14 with TypeScript
   - Configure Tailwind CSS with Nord color scheme
   - Set up ESLint and Prettier
   - Create basic project structure

2. **Content parsing infrastructure**
   - Install gray-matter for frontmatter parsing
   - Set up remark/rehype for markdown processing
   - Create content utilities for posts and portfolio
   - Implement syntax highlighting (Prism.js or similar)

### Phase 2: Core Layout & Components
1. **Convert Jekyll layouts to React components**
   - Create `Layout` component (replaces `_layouts/default.html`)
   - Build `Header` and `Footer` components
   - Implement responsive navigation with mobile toggle
   - Create `SEO` component for meta tags

2. **Migrate styling system**
   - Convert Nord color scheme to Tailwind config
   - Create custom Tailwind utilities for existing patterns
   - Migrate key SCSS patterns to Tailwind classes
   - Ensure responsive design consistency

### Phase 3: Page Structure & Routing
1. **Set up Next.js pages**
   - Create home page (`pages/index.tsx`)
   - Set up blog listing with pagination (`pages/blog/[...slug].tsx`)
   - Create individual post pages (`pages/[year]/[month]/[day]/[slug].tsx`)
   - Build static pages (about, archive, categories)

2. **Implement dynamic routing**
   - Use `getStaticPaths` and `getStaticProps` for posts
   - Maintain existing URL structure for SEO
   - Set up category and archive pages
   - Implement pagination logic

### Phase 4: Content Migration
1. **Blog posts**
   - Keep existing markdown files in `_posts/`
   - Create content parsing utilities
   - Implement post metadata handling
   - Set up category filtering and archives

2. **Portfolio section**
   - Migrate portfolio items from `_portfolio/`
   - Create portfolio component structure
   - Implement project showcase layout

### Phase 5: Enhanced Features
1. **Interactive components**
   - Code block copying functionality
   - Search implementation (client-side)
   - RSS feed generation
   - Social sharing buttons

2. **Performance optimization**
   - Image optimization with Next.js Image
   - Lazy loading for content
   - Static generation for all pages
   - SEO optimization

### Phase 6: Deployment & CI/CD
1. **GitHub Actions setup**
   - Configure build and deployment pipeline
   - Set up automated testing and linting
   - Environment-specific builds

2. **Deployment options**
   - Option A: Continue with GitHub Pages (static export)
   - Option B: Deploy to Vercel for enhanced features
   - Set up custom domain if needed

## Technical Decisions

### Framework Choices
- **Next.js 14**: App Router for modern React patterns
- **TypeScript**: Type safety and better DX
- **Tailwind CSS**: Utility-first styling to replace SCSS
- **Gray-matter + Remark**: Markdown processing pipeline

### Content Strategy
- **Keep markdown files**: Maintain existing content structure
- **Preserve URLs**: Ensure SEO continuity with existing permalink structure
- **Static generation**: Pre-render all content for performance

### Styling Migration
- **Nord theme preservation**: Translate existing Nord variables to Tailwind config
- **Component-based styling**: Replace SCSS partials with Tailwind component classes
- **Responsive design**: Maintain mobile-first approach

## File Structure (Proposed)
```
/
├── components/
│   ├── Layout/
│   ├── Header/
│   ├── Footer/
│   ├── PostCard/
│   └── Navigation/
├── lib/
│   ├── posts.ts
│   ├── portfolio.ts
│   └── utils.ts
├── pages/
│   ├── index.tsx
│   ├── blog/
│   ├── about.tsx
│   └── [year]/[month]/[day]/[slug].tsx
├── styles/
│   └── globals.css
├── _posts/ (preserved)
├── _portfolio/ (preserved)
├── public/assets/ (migrated from assets/)
└── tailwind.config.js
```

## Risk Mitigation
- **SEO preservation**: Maintain existing URL structure and meta tags
- **Content integrity**: Keep original markdown files as source of truth
- **Gradual migration**: Build new system alongside existing Jekyll site
- **Fallback plan**: Can revert to Jekyll if issues arise

## Success Metrics
- All existing content successfully migrated
- Page load speeds improved or maintained
- SEO rankings preserved
- Mobile responsiveness maintained
- All interactive features working
- Automated deployment pipeline functional

## Timeline Estimate
- **Phase 1-2**: 2-3 days (Setup and core components)
- **Phase 3-4**: 2-3 days (Routing and content migration)
- **Phase 5-6**: 1-2 days (Features and deployment)
- **Total**: 5-8 days for complete migration

## Dependencies
- Node.js 18+ for Next.js 14
- Existing content and assets
- GitHub repository access for Actions setup