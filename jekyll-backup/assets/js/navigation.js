/**
 * @description
 * This script handles the functionality for the mobile navigation toggle.
 * It allows users to show or hide the main navigation menu on smaller screens
 * by clicking a toggle button (e.g., a hamburger icon).
 *
 * Key features:
 * - Listens for click events on the mobile navigation toggle button.
 * - Toggles an 'is-active' class on both the toggle button and the navigation menu
 *   to control their visibility and appearance.
 * - Updates the `aria-expanded` attribute on the toggle button for accessibility,
 *   indicating to screen readers whether the menu is open or closed.
 *
 * @dependencies
 * - Assumes the presence of HTML elements with IDs `nav-toggle` (for the button)
 *   and `nav-menu` (for the navigation menu itself, which is likely the <nav class="site-nav"> element or its wrapper).
 *
 * @notes
 * - This script should be included in the site's main JavaScript bundle or loaded appropriately
 *   on pages that use the mobile navigation (typically all pages with a header).
 * - Ensure that the corresponding CSS styles in `_mobile.scss` (and potentially `_navigation.scss` or `_header.scss`)
 *   correctly use the `is-active` class to show/hide the menu and style the toggle.
 */

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("site-nav-mobile-wrapper"); // Target the wrapper

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      // Toggle active class on the menu itself for visibility
      navMenu.classList.toggle("is-active");

      // Toggle active class on the button for styling (e.g., transform to X)
      navToggle.classList.toggle("is-active");

      // Toggle aria-expanded attribute for accessibility
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true" || false;
      navToggle.setAttribute("aria-expanded", !isExpanded);

      // Optional: Toggle body class to prevent scrolling when menu is open
      // document.body.classList.toggle('no-scroll');
    });
  } else {
    if (!navToggle) {
      console.warn("Mobile navigation toggle button with ID 'nav-toggle' not found.");
    }
    if (!navMenu) {
      console.warn("Mobile navigation menu with ID 'site-nav-mobile-wrapper' not found.");
    }
  }
});
