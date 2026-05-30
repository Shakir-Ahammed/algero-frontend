import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useApiData } from "../../hooks/useApiData";
import { useSeo } from "../../hooks/useSeo";
import { BLOG_POSTS } from "../../features/blog/blog.data";
import type { BlogPost } from "../../types";

/* ── Simple social SVG icons (lucide doesn't have brand icons) ── */
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

/* ── API types ── */
interface ApiBlogDetail {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  images: string[] | null;
  author: string | null;
  read: string | null;
  date: string | null;
  published_at: string | null;
}

function mapApiBlogDetail(b: ApiBlogDetail): BlogPost {
  return {
    id: b.id,
    title: b.title,
    slug: b.slug,
    category: b.category,
    date: b.date ?? "",
    image:
      b.image ||
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    read: b.read || "5 min read",
    excerpt: b.excerpt ?? undefined,
    content: b.content ?? undefined,
    images: b.images && b.images.length > 0 ? b.images : undefined,
    author: b.author ?? undefined,
  };
}

export const BlogViewPage = () => {
  useScrollReveal();
  const { slug } = useParams<{ slug: string }>();

  // Try API first, fallback to static data
  const { data: apiBlog, loading } = useApiData<ApiBlogDetail | null>(
    `/blogs/${slug}`,
    null
  );

  // Find from static data as fallback
  const staticBlog = BLOG_POSTS.find((p) => p.slug === slug);

  const blog: BlogPost | null = apiBlog
    ? mapApiBlogDetail(apiBlog)
    : staticBlog ?? null;

  // Related posts (same category, excluding current)
  const related = BLOG_POSTS.filter(
    (p) => p.slug !== slug && blog && p.category === blog.category
  ).slice(0, 2);
  // If no same-category posts, show other posts
  const relatedPosts =
    related.length > 0
      ? related
      : BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  // SEO
  useSeo({
    title: blog?.title ?? "Blog Post",
    description: blog?.excerpt ?? "Read our latest engineering insights.",
    image: blog?.image,
    type: "article",
    author: blog?.author,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  });

  // Share URL
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = blog?.title ?? "";

  // Loading state
  if (loading && !staticBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not found
  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold text-white">Post Not Found</h1>
        <p className="text-gray-400">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-24 min-h-screen" itemScope itemType="https://schema.org/BlogPosting">
      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[50vh] min-h-[400px] max-h-[560px] overflow-hidden">
        {/* Background image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
          itemProp="image"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/50 to-transparent" />

        {/* Back button */}
        <div className="absolute top-28 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
            id="back-to-blog"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>

        {/* Title area overlapping image */}
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 reveal">
              <ol className="flex items-center gap-1.5 text-xs text-gray-400" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link to="/" className="hover:text-white transition-colors" itemProp="item">
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <ChevronRight className="w-3 h-3 text-gray-600" />
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link to="/blog" className="hover:text-white transition-colors" itemProp="item">
                    <span itemProp="name">Blog</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <ChevronRight className="w-3 h-3 text-gray-600" />
                <li className="text-gray-500 truncate max-w-[200px]" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span itemProp="name">{blog.title}</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>

            {/* Category + Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5 reveal reveal-delay-1">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                {blog.category}
              </span>
              <div className="flex items-center text-gray-400 text-sm gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={blog.date} itemProp="datePublished">
                    {blog.date}
                  </time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.read}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight reveal reveal-delay-2"
              itemProp="headline"
            >
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Author + Share bar ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.06] reveal">
          {/* Author */}
          {blog.author && (
            <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {blog.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white" itemProp="name">
                  {blog.author}
                </p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>
          )}

          {/* Share buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 mr-1 flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" /> Share
            </span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-gray-400 hover:text-white transition-all"
              aria-label="Share on Twitter"
            >
              <XIcon />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-gray-400 hover:text-white transition-all"
              aria-label="Share on LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-gray-400 hover:text-white transition-all"
              aria-label="Share on Facebook"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>

      {/* ── Blog Content ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {blog.excerpt && (
          <p className="text-xl text-gray-300 font-light leading-relaxed mb-10 border-l-2 border-blue-500/40 pl-6 reveal" itemProp="description">
            {blog.excerpt}
          </p>
        )}

        {blog.content ? (
          <div
            className="blog-content reveal"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        ) : (
          <div className="blog-content reveal">
            <p className="text-gray-300 leading-relaxed">
              Full content for this article is coming soon. Check back later for the complete post.
            </p>
          </div>
        )}
      </div>

      {/* ── Image Gallery ── */}
      {blog.images && blog.images.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-xl font-bold text-white mb-6 reveal">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal">
            {blog.images.map((img, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border border-white/[0.06] group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`${blog.title} gallery ${idx + 1}`}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Author Card (bottom) ── */}
      {blog.author && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="glass-card rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 reveal">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-blue-400 uppercase tracking-wider font-semibold mb-1">
                Written by
              </p>
              <p className="text-lg font-bold text-white">{blog.author}</p>
              <p className="text-sm text-gray-400 mt-1">
                Building the future of digital products at Algero.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Related Posts ── */}
      {relatedPosts.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <h2 className="text-2xl font-bold text-white mb-8 reveal">
            Related Articles
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {relatedPosts.map((post, idx) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.slug}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer reveal"
                style={{ transitionDelay: `${idx * 120}ms` }}
                id={`related-post-${idx}`}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.read}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group text-sm font-medium"
          id="view-all-posts"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          View All Posts
        </Link>
      </div>
    </article>
  );
};
