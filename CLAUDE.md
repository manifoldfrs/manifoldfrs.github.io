# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal blog and portfolio site for Faris Habib, hosted on GitHub Pages. The site features a minimalist design with a Nord color scheme and focuses on personal writing, technical content, and portfolio showcase.

## Development Commands

### Local Development
```bash
bundle install                              # Install Ruby dependencies
bundle exec jekyll serve --livereload      # Run dev server with auto-reload at localhost:4000
bundle exec jekyll build                   # Build site to _site/ directory
```

### Content Creation
- Blog posts: Create in `_posts/` with format `YYYY-MM-DD-title.md`
- Portfolio items: Create in `_portfolio/` directory
- Static pages: Create in `_pages/` directory

## Architecture Overview

### Jekyll Configuration
- **Permalink structure**: `/:year/:month/:day/:title/`
- **Collections**: `portfolio` and `pages` with custom permalinks
- **Pagination**: 10 posts per page on `/blog/page:num/`
- **Core plugins**: jekyll-feed, jekyll-seo-tag, jekyll-sitemap, jekyll-paginate, jekyll-archives

### Content Structure
- **Blog posts** in `_posts/` with categories: dev, diet, fitness, religion, talks, posts
- **Portfolio** in `_portfolio/` (currently minimal, navigation commented out)
- **Static pages** in `_pages/` for about, archive, categories

### Styling System
- **Nord color scheme** deeply integrated throughout
- **SCSS architecture** with 15+ modular partials in `_sass/`
- **Key files**: `_variables.scss` (Nord palette), `_syntax-nord.scss` (code highlighting)
- **Import order**: Variables → Base → Typography → Code → Layouts → Components → Pages

### Layout System
- **Base template**: `_layouts/default.html` with header/footer
- **Specialized layouts**: home, post, portfolio, page
- **Reusable components** in `_includes/` for navigation, post cards, pagination

### JavaScript Features
- Mobile navigation toggle
- Code block copying with Clipboard.js
- Lazy loading and performance optimizations

## Deployment

- **Automatic deployment** via GitHub Actions on push to `main` branch
- **Ruby 3.1** with bundler caching
- **Production build** with `bundle exec jekyll build`
- **Hosted** on GitHub Pages

## Development Guidelines

From `.cursorrules`:
- Maintain Jekyll/GitHub Pages compatibility
- Use semantic HTML and SCSS best practices
- Follow established filename conventions for posts
- Ensure valid frontmatter in all content files
- Optimize for performance and accessibility

## Key Patterns

- **Color theming**: All colors defined in `_config.yml` under `nord_colors` and used throughout SCSS
- **Content frontmatter**: Consistent structure with layout, title, date, categories
- **Navigation**: Clean, minimal structure focusing on content discovery
- **Mobile-first**: Responsive design with dedicated mobile navigation
- **SEO optimized**: jekyll-seo-tag integration with proper meta tags