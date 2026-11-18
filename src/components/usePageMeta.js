import { useEffect } from "react";
import { site } from "../data/site";

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

// Sets the title and description per page. (Static defaults live in index.html.)
export default function usePageMeta(title, description = site.tagline) {
  useEffect(() => {
    const full = title ? `${title} — ${site.name}` : site.name;
    document.title = full;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", full);
    setMeta('meta[property="og:description"]', "content", description);
    if (site.url) {
      const link = document.head.querySelector('link[rel="canonical"]');
      if (link) link.setAttribute("href", site.url + window.location.pathname);
    }
  }, [title, description]);
}
