# Task: Remove Tags from Homepage

## Plan

### Goal
Remove the category/tag badges that appear on blog post cards on the homepage while keeping them on individual post pages if needed.

### Analysis
From the screenshots, I can see tags/categories like "Posts", "Religion", "Diet", "Fitness" appearing as badges on the blog post cards on the homepage. These need to be removed for a cleaner look.

### Steps to Complete

1. **Identify the homepage layout file**
   - Find the template that renders the homepage
   - This is likely in `_layouts/home.html` or similar

2. **Locate the post card component**
   - Find where blog posts are displayed on the homepage
   - Look for the include or partial that renders each post card

3. **Remove or comment out the tag/category display code**
   - Find the specific code that displays categories/tags
   - Remove or comment it out only for the homepage view

4. **Verify the changes**
   - Ensure tags are removed from homepage
   - Confirm tags still appear on individual posts if needed
   - Check that the layout remains clean and functional

### Files to Examine
- `_layouts/home.html` - Homepage layout
- `_includes/post-card.html` or similar - Post card component
- `index.html` or `index.md` - Main homepage file
- Any SCSS files related to tag styling

Please review this plan and let me know if you'd like me to proceed.