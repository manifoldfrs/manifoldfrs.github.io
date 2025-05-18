// Code copy button functionality using Clipboard.js
// This script runs after the DOM is ready and injects a visible "Copy" button
// at the top-right of every Rouge-generated code block.

document.addEventListener("DOMContentLoaded", function () {
  // Select all Rouge code wrappers
  const codeWrappers = document.querySelectorAll("div.highlighter-rouge");

  codeWrappers.forEach(function (wrapper, idx) {
    const highlightDiv = wrapper.querySelector("div.highlight");
    if (!highlightDiv) return;

    const preEl = highlightDiv.querySelector("pre");
    if (!preEl) return;

    // Ensure the pre has an id for clipboard.js
    const preId = `code-${idx}`;
    preEl.id = preId;

    // Ensure positioning context
    highlightDiv.style.position = "relative";

    // Build the button
    const button = document.createElement("button");
    button.className = "code-copy-button";
    button.type = "button";
    button.setAttribute("aria-label", "Copy code to clipboard");
    button.setAttribute("data-clipboard-target", `#${preId}`);
    button.innerHTML = '<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H8V2h8v2z"></path><rect x="4" y="4" width="16" height="18" rx="2" ry="2"></rect></svg>';

    // Insert button as first child of highlight div so it sits above the code
    highlightDiv.insertBefore(button, highlightDiv.firstChild);

    const clipboard = new ClipboardJS(button);

    clipboard.on("success", function (e) {
      e.clearSelection();
      e.trigger.textContent = "Copied!";
      setTimeout(() => (e.trigger.textContent = "Copy"), 2000);
    });

    clipboard.on("error", function (e) {
      e.trigger.textContent = "Error";
      setTimeout(() => (e.trigger.textContent = "Copy"), 2000);
    });
  });
});
