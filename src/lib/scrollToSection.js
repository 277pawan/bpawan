/** Scroll to a home-page section id; works from any route. */
export function scrollToHomeSection(id, navigate) {
  if (window.location.pathname === "/") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  navigate(`/?section=${encodeURIComponent(id)}`);
}

export function applyPendingHomeScroll() {
  const params = new URLSearchParams(window.location.search);
  const section =
    params.get("section") || window.location.hash.replace("#", "").trim();
  if (!section) return;

  const run = (attempt = 0) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (params.has("section")) {
        window.history.replaceState({}, "", window.location.pathname);
      }
      return;
    }
    if (attempt < 30) {
      requestAnimationFrame(() => run(attempt + 1));
    }
  };

  run();
}
