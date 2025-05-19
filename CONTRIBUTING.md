# Contributing to FRSHBB Personal Website

First off, thank you for considering contributing to this project! Whether it's a bug report, new feature suggestion, or a pull request, all contributions are welcome and greatly appreciated.

This document provides guidelines for contributing to this Jekyll-based personal website. Please read it carefully to ensure a smooth and effective collaboration process.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Style Guides](#style-guides)
  - [Git Commit Messages](#git-commit-messages)
  - [Markdown and Content](#markdown-and-content)
  - [SCSS/CSS and HTML](#scsscss-and-html)
  - [JavaScript](#javascript)
- [Issue and Pull Request Labels](#issue-and-pull-request-labels)

## Code of Conduct

This project and everyone participating in it is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md) (To be created - for now, please be respectful and professional). By participating, you are expected to uphold this code. Please report unacceptable behavior.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/frshbb/frshbb.github.io/issues).

If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/frshbb/frshbb.github.io/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample or an executable test case** demonstrating the expected behavior that is not occurring.

Provide information about your environment:

- Browser and version
- Operating System and version
- Any other relevant details

### Suggesting Enhancements

If you have an idea for an enhancement, please first discuss the change you wish to make via a GitHub issue before making a change.

1.  Search existing [Issues](https://github.com/frshbb/frshbb.github.io/issues) to see if the enhancement has already been suggested.
2.  If not, [open a new issue](https://github.com/frshbb/frshbb.github.io/issues/new) providing:
    - A clear and descriptive title.
    - A step-by-step description of the suggested enhancement in as many details as possible.
    - Explain why this enhancement would be useful.
    - Comparable examples in other sites if relevant.

### Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1.  **Fork the repository** and create your branch from `main`.
    - Branch naming convention: `feature/brief-description` or `fix/issue-number-brief-description`.
2.  **Set up your development environment** (see [Development Setup](#development-setup)).
3.  **Make your changes**. Ensure your code adheres to the project's [Style Guides](#style-guides).
4.  **Add or update documentation** if your changes affect behavior or add new features.
5.  **Test your changes** locally to ensure they work as expected and don't break existing functionality.
6.  **Commit your changes** using a clear and descriptive commit message (see [Git Commit Messages](#git-commit-messages)).
7.  **Push your branch** to your fork.
8.  **Open a pull request** to the `main` branch of the original repository.
    - Provide a clear title and description for your pull request.
    - Link to any relevant issues (e.g., "Closes #123" or "Fixes #456").
    - Be prepared to discuss your changes and make further adjustments if requested.

## Development Setup

Please refer to the `README.md` file for detailed instructions on how to set up your local development environment. Key steps include:

1.  Cloning the repository.
2.  Installing Ruby and Bundler.
3.  Running `bundle install` to install dependencies.
4.  Running `bundle exec jekyll serve --livereload` to start the local server.

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally after the first line.
- Consider using [Conventional Commits](https://www.conventionalcommits.org/) for more structured messages, e.g.:
  - `feat: add dark mode toggle button`
  - `fix: correct responsive layout on portfolio page`
  - `docs: update README with setup instructions`
  - `style: refactor SCSS variables for Nord theme`
  - `refactor: improve mobile navigation JavaScript`
  - `perf: optimize image loading for blog posts`
  - `test: add unit tests for search functionality`

### Markdown and Content

- Follow Markdown best practices. Refer to the `_pages/style-guide.md`.
- Ensure frontmatter is complete and accurate for posts and portfolio items.
- Optimize images and use descriptive alt text.

### SCSS/CSS and HTML

- Follow SCSS best practices (e.g., BEM naming convention where applicable, modular structure).
- Ensure HTML is semantic and accessible (ARIA attributes, keyboard navigation).
- Optimize assets for performance.
- Layouts and includes should be modular and reusable.
- Comment complex SCSS rules or HTML structures.

### JavaScript

- Write clean, readable, and well-commented JavaScript.
- Ensure scripts are efficient and do not negatively impact performance.
- Handle errors gracefully.
- Consider accessibility implications of any dynamic changes.

## Issue and Pull Request Labels

We may use labels to organize issues and pull requests. Here are some common ones:

- `bug`: Something isn't working.
- `enhancement`: New feature or request.
- `documentation`: Improvements or additions to documentation.
- `help wanted`: Extra attention is needed.
- `good first issue`: Good for newcomers.
- `refactor`: Code changes that neither fix a bug nor add a feature.
- `style`: Markup, SCSS, or cosmetic changes.

Thank you for your contribution!
