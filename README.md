# Overview

Template for my personal website.

## Features

- Blog with categorized posts and pagination
- Portfolio section showcasing my projects and work
- About page with personal information
- Clean, responsive design optimized for all devices
- Nord color theme for a visually appealing experience
- Integration with social media platforms
- Search functionality for finding content quickly
- Optimized for performance and accessibility

## Setup

### Prerequisites

- Ruby (version 2.5.0 or higher)
- RubyGems
- GCC and Make (for some Ruby gems)

### Installation

1. Clone this repository: `git clone https://github.com/frshbb/frshbb.github.io.git`
2. Navigate to the project directory: `cd frshbb.github.io`
3. Install dependencies: `bundle install`
4. Run the development server: `bundle exec jekyll serve`
5. Visit `http://localhost:4000` in your browser

## Content Management

### Blog Posts

Create new blog posts in the `_posts` directory following the naming convention `YYYY-MM-DD-title.md`. Each post should include frontmatter:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS +0000
categories: [category1, category2]
---
```

### Portfolio Items

Add portfolio items in the `_portfolio` directory. Each item should include frontmatter:

```yaml
---
layout: portfolio
title: "Project Title"
date: YYYY-MM-DD
featured_image: /assets/images/portfolio/project.jpg
categories: [category1, category2]
technologies: [tech1, tech2]
live_url: https://example.com
repo_url: https://github.com/username/repo
---
```

## Development

The site is built with Jekyll and follows a modular component architecture. Key directories:

- `_layouts`: Page templates
- `_includes`: Reusable components
- `_sass`: SCSS stylesheets
- `assets`: JavaScript, CSS, images, and other assets

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Automated Deployment

This site uses GitHub Actions for automated builds and deployments:

1. When you push changes to the `main` branch, the GitHub Actions workflow is triggered
2. The workflow builds the site using Jekyll
3. The built site is automatically deployed to GitHub Pages

### Manual Deployment

You can also trigger the deployment manually:

1. Go to the GitHub repository
2. Navigate to the "Actions" tab
3. Select the "Build and Deploy to GitHub Pages" workflow
4. Click "Run workflow"

### Configuration

To enable GitHub Pages for this repository:

1. Go to the repository settings
2. Navigate to the "Pages" section
3. Under "Source", select "GitHub Actions" as the deployment method

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
