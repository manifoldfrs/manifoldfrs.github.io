# Add Delphi Mind Social Link

## Plan

### Objective
Add a new social media link for "Delphi Mind" with URL `https://www.delphi.ai/faris-habib` to the website's social links section.

### Analysis & Steps

1. **Locate current social links implementation**
   - Find where social links are defined in the codebase
   - Understand the current structure and styling

2. **Review the provided screenshot**
   - Examine the Delphi logo and branding from the screenshot
   - Determine how to best represent this as a social icon

3. **Add Delphi social link**
   - Add the new social link to the appropriate configuration or data file
   - Ensure it follows the same pattern as existing social links
   - Consider icon/logo representation options

4. **Test the implementation**
   - Verify the link appears correctly
   - Ensure it maintains visual consistency with other social links
   - Test the link functionality

### Technical Considerations
- Need to determine if social links are configured in `_config.yml`, a data file, or directly in templates
- May need to add a custom icon or use text representation for Delphi
- Ensure the link opens in a new tab like other social links

## Review

### Implementation Summary

Successfully added the Delphi Mind social link to the website's footer. Here's what was done:

1. **Located social links implementation**
   - Found social links are defined in `/components/Footer/index.tsx`
   - This is a Next.js site (not Jekyll) with React components
   - Social links are stored in a `socialLinks` array with name, href, and icon properties

2. **Added Delphi Mind to social links**
   - Added new entry: `{ name: 'Delphi Mind', href: 'https://www.delphi.ai/faris-habib', icon: 'delphi' }`
   - Positioned after Substack link to maintain logical grouping

3. **Implemented logo display**
   - Used the provided logo image at `/public/images/delphi_logo1.jpeg`
   - Modified `SocialIcon` component to handle special case for Delphi
   - Returns an `<img>` tag instead of SVG for the Delphi icon
   - Applied consistent styling: `w-5 h-5 rounded` with `objectFit: 'cover'`

4. **Technical details**
   - The link will open in a new tab (configured with `target='_blank'` and `rel='noopener noreferrer'`)
   - Maintains hover effects with `hover:text-primary transition-colors`
   - Accessible with proper `aria-label` attribute
   - Image will be served from `/images/delphi_logo1.jpeg` in production

### Files Modified
- `/components/Footer/index.tsx` - Added Delphi to socialLinks array and modified SocialIcon component

### Testing
- Development server started successfully
- Implementation follows existing patterns and conventions
- Link should appear in the footer alongside other social icons