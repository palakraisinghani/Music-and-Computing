/* demo-bridge.js: lets a demonstration run inside a slide.
   When the page is embedded in the deck, it is marked "in-deck" and the slide-changing
   keys are passed up to the deck, so → / ← still move between slides while the demo has focus. */
(() => {
  if (window.parent === window) return;
  document.documentElement.classList.add("in-deck");
  const KEYS = ["ArrowRight", "ArrowLeft", "PageDown", "PageUp"];
  addEventListener("keydown", e => {
    if (!KEYS.includes(e.key) || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
    e.preventDefault();
    window.parent.postMessage({ deckKey: e.key }, "*");
  });
})();
