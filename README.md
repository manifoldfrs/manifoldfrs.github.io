# FRSHBB Personal Website

## Overview

This is the repository for my personal website, [frshbb.github.io](https://frshbb.github.io/). It serves as a blog, a portfolio of my work, and a central hub for my online presence. The site is built with Jekyll and hosted on GitHub Pages, featuring a clean, minimalist design inspired by Naval Ravikant's website with a Nord color scheme.

## Features

- **Blog**: A platform for sharing thoughts, ideas, and articles, with features like categorization, tagging, pagination, and syntax highlighting for code blocks.
- **Portfolio**: A showcase of my projects and work, with detailed descriptions, images, and links to live versions or repositories.
- **Responsive Design**: Optimized for a seamless experience across all devices (desktops, tablets, and mobile phones).
- **Nord Color Scheme**: A visually appealing and consistent color palette.
- **Social Media Integration**: Links to my profiles on various social media platforms (LinkedIn, GitHub, Twitter, Instagram, Substack).
- **Search Functionality**: Client-side search powered by Simple-Jekyll-Search (to be implemented).
- **Performance Optimized**: Fast loading times through optimized assets and efficient code.
- **Accessibility Focused**: Built with accessibility best practices in mind.
- **Automated Deployment**: Continuous deployment via GitHub Actions whenever changes are pushed to the `main` branch.

## Setup

### Prerequisites

Ensure you have the following installed on your local machine:

- Ruby (version 2.7.0 or higher is recommended. Check with `ruby -v`)
- RubyGems (comes with Ruby. Check with `gem -v`)
- Bundler (Install with `gem install bundler`. Check with `bundle -v`)
- GCC and Make (for compiling some Ruby gems, especially on Linux. On macOS, Xcode Command Line Tools provide this. On Windows, you might need RubyInstaller Development Kit).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/frshbb/frshbb.github.io.git
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd frshbb.github.io
    ```
3.  **Install dependencies**:
    This command installs all the gems specified in the `Gemfile`.
    ```bash
    bundle install
    ```
4.  **Run the development server**:
    This command builds the site and serves it locally. It will also watch for changes and rebuild automatically.
    ```bash
    bundle exec jekyll serve --livereload
    ```
5.  **View the site**:
    Open your web browser and go to `http://localhost:4000`.

## Content Management

All content is written in Markdown and managed through Git.

### Blog Posts

- **Location**: `_posts/` directory.
- **Filename Convention**: `YYYY-MM-DD-your-post-title.md`. The date in the filename is used by Jekyll for ordering and permalinks.
- **Frontmatter**: Each blog post must begin with YAML frontmatter.

  ```yaml
  ---
  layout: post
  title: "Your Amazing Post Title"
  date: YYYY-MM-DD HH:MM:SS +/-ZZZZ # e.g., 2023-10-27 10:00:00 -0700
  categories: [category1, category2] # General topics
  tags: [specific-tag1, specific-tag2] # More specific keywords
  excerpt: "A brief summary of your post that might appear in listings."
  # featured_image: /assets/images/posts/your-image.jpg # Optional: for post header or social sharing
  ---
  Your post content in Markdown starts here...
  ```

  - `layout`: Should typically be `post`.
  - `title`: The title of your blog post.
  - `date`: The publication date and time. The time and timezone are important for accurate scheduling and ordering.
  - `categories`: An array of one or more categories. These are broader topics.
  - `tags`: (Optional) An array of more specific keywords.
  - `excerpt`: (Optional) A short summary. If not provided, Jekyll will auto-generate one.
  - `featured_image`: (Optional) Path to an image for the post, can be used in the layout or for social media cards.

### Portfolio Items

- **Location**: `_portfolio/` directory.
- **Filename Convention**: `project-slug-name.md` (e.g., `my-awesome-app.md`).
- **Frontmatter**: Each portfolio item requires frontmatter.

  ```yaml
  ---
  layout: portfolio
  title: "Cool Project Name"
  date: YYYY-MM-DD # Launch date or completion date
  featured_image: /assets/images/portfolio/project-thumbnail.jpg
  categories: [project-type, another-type] # e.g., [web-development, design]
  technologies: [Tech1, Tech2, JavaScript, Ruby on Rails]
  live_url: https://example.com/live-project # Optional
  repo_url: https://github.com/username/project-repo # Optional
  excerpt: "A brief one-liner about the project."
  ---

  Detailed description of the project in Markdown...

  ## Challenge
  What problem did this project solve?

  ## Solution
  How did you approach it? What was your solution?

  ## Results
  What was the outcome?
  ```

  - `layout`: Should be `portfolio`.
  - `title`: The name of your project.
  - `date`: The date the project was completed or launched.
  - `featured_image`: Path to a thumbnail or main image for the project.
  - `categories`: Type of project or general area.
  - `technologies`: A list of technologies used.
  - `live_url`: (Optional) Link to the live project.
  - `repo_url`: (Optional) Link to the code repository.
  - `excerpt`: (Optional) A short summary for listings.

### Static Pages

- **Location**: `_pages/` directory (e.g., `about.md`, `contact.md`).
- **Frontmatter**:

  ```yaml
  ---
  layout: page
  title: "About Me"
  permalink: /about/ # Defines the URL
  ---
  Content for the page...
  ```

## Development

The site is built with Jekyll and utilizes a modular component architecture.

- **`_config.yml`**: Main site configuration. Includes site title, author details, social media links, Markdown processor, plugins, etc.
- **`_includes/`**: Reusable HTML snippets (components) like header, footer, navigation, social links, post cards.
- **`_layouts/`**: HTML templates for different types of content (e.g., `default.html`, `post.html`, `page.html`).
- **`_sass/`**: SCSS (Sass) stylesheets. Partials are organized by component or concern (e.g., `_variables.scss`, `_base.scss`, `_header.scss`, `_nord-theme.scss`). `assets/css/main.scss` imports all partials.
- **`assets/`**: Static assets.
  - `assets/css/`: Compiled CSS will be output here by Jekyll (though `main.scss` is the source).
  - `assets/js/`: Custom JavaScript files (e.g., `navigation.js` for mobile menu, `code-copy.js`).
  - `assets/images/`: Site images, including favicons, author avatar, and images for posts/portfolio.
- **`Gemfile`**: Ruby dependencies managed by Bundler.

### Style Guide

Refer to `_pages/style-guide.md` for content creation guidelines, Markdown best practices, and image optimization tips.

### Contributing

See `CONTRIBUTING.md` for guidelines on how to contribute to the project, report issues, or suggest improvements.

## Deployment

The site is automatically deployed to GitHub Pages.

### Automated Deployment via GitHub Actions

- **Workflow File**: `.github/workflows/github-pages.yml`
- **Trigger**: Pushing changes to the `main` branch.
- **Process**:
  1.  GitHub Actions workflow is triggered.
  2.  The workflow checks out the code.
  3.  It sets up GitHub Pages.
  4.  Jekyll builds the site (`jekyll build`).
  5.  The built site (from `_site` directory) is uploaded as an artifact.
  6.  A separate deployment job deploys this artifact to GitHub Pages.
- **Branch**: The site is built from the `main` branch and deployed to the `gh-pages` branch (or directly to the Pages service if configured for a custom Actions deployment).

### GitHub Pages Configuration

To ensure GitHub Pages deploys correctly:

1.  Go to your repository on GitHub.
2.  Navigate to **Settings** > **Pages**.
3.  Under "Build and deployment", ensure the **Source** is set to "GitHub Actions".

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
