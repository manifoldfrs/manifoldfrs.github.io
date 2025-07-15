// Code copy button functionality using Clipboard.js
// This script runs after the DOM is ready and injects a visible "Copy" button
// at the top-right of every Rouge-generated code block.

document.addEventListener("DOMContentLoaded", function () {
  // Check if ClipboardJS is loaded
  if (typeof ClipboardJS === "undefined") {
    console.error("ClipboardJS not loaded. Copy-to-clipboard functionality will not work.");
    return;
  }

  // Select all Rouge code wrappers
  const codeWrappers = document.querySelectorAll("div.highlighter-rouge");
  console.log(`Found ${codeWrappers.length} Rouge code wrappers.`);

  codeWrappers.forEach(function (wrapper, idx) {
    console.log(`Processing wrapper ${idx + 1}...`);
    const highlightDiv = wrapper.querySelector("div.highlight");
    if (!highlightDiv) {
      console.warn(`Wrapper ${idx + 1} does not contain div.highlight.`);
      return;
    }

    const preEl = highlightDiv.querySelector("pre.highlight"); // Target pre.highlight specifically
    if (!preEl) {
      console.warn(`Wrapper ${idx + 1} (div.highlight) does not contain pre.highlight.`);
      return;
    }
    console.log(`Found pre.highlight in wrapper ${idx + 1}.`);

    // Ensure the pre has an id for clipboard.js
    const preId = `code-block-${idx}`; // Make ID more specific
    preEl.id = preId;

    // Ensure positioning context for the button
    // The parent `div.highlighter-rouge` or `div.highlight` should be relative.
    // `_syntax-nord.scss` sets `div.highlighter-rouge` and `div.highlight` to relative.

    // Build the button
    const button = document.createElement("button");
    button.className = "code-copy-button";
    button.type = "button";
    button.setAttribute("aria-label", "Copy code to clipboard");
    button.setAttribute("data-clipboard-target", `#${preId}`);
    // SVG icon for accessibility: role="img" and aria-hidden="true" as the button has aria-label
    button.innerHTML = '<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg><span>Copy</span>';

    // Insert button as first child of highlight div so it sits above the code, but controlled by CSS positioning
    highlightDiv.insertBefore(button, highlightDiv.firstChild);
    console.log(`Button added for wrapper ${idx + 1} with target #${preId}.`);

    try {
      const clipboard = new ClipboardJS(button);
      const buttonSpan = button.querySelector("span");

      clipboard.on("success", function (e) {
        console.log(`Successfully copied from #${preId}`);
        e.clearSelection();
        if (buttonSpan) buttonSpan.textContent = "Copied!";
        button.classList.add("copied");
        setTimeout(() => {
          if (buttonSpan) buttonSpan.textContent = "Copy";
          button.classList.remove("copied");
        }, 2000);
      });

      clipboard.on("error", function (e) {
        console.error(`Error copying from #${preId}:`, e);
        if (buttonSpan) buttonSpan.textContent = "Error";
        setTimeout(() => {
          if (buttonSpan) buttonSpan.textContent = "Copy";
        }, 2000);
      });
      console.log(`ClipboardJS initialized for button in wrapper ${idx + 1}.`);
    } catch (error) {
      console.error(`Failed to initialize ClipboardJS for wrapper ${idx + 1}:`, error);
    }
  });
});
