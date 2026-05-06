import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
}

/**
 * Sets document title and meta tags for SEO.
 * Updates Open Graph, Twitter Card, and standard meta tags.
 */
export function useSeo({
  title,
  description,
  image,
  url,
  type = "website",
  author,
  publishedTime,
}: SeoProps) {
  useEffect(() => {
    const siteName = "Algero";
    const fullTitle = `${title} — ${siteName}`;

    // Document title
    document.title = fullTitle;

    // Helper to set/create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    if (description) setMeta("name", "description", description);
    if (author) setMeta("name", "author", author);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:site_name", siteName);
    setMeta("property", "og:type", type);
    if (description) setMeta("property", "og:description", description);
    if (image) setMeta("property", "og:image", image);
    if (url) setMeta("property", "og:url", url);

    // Article-specific
    if (type === "article") {
      if (publishedTime)
        setMeta("property", "article:published_time", publishedTime);
      if (author) setMeta("property", "article:author", author);
    }

    // Twitter Card
    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", fullTitle);
    if (description) setMeta("name", "twitter:description", description);
    if (image) setMeta("name", "twitter:image", image);

    return () => {
      document.title = `${siteName} — Build the Future of Digital Products`;
    };
  }, [title, description, image, url, type, author, publishedTime]);
}
