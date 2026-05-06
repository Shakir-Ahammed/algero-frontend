import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useApiData } from "../../hooks/useApiData";
import { useSeo } from "../../hooks/useSeo";
import { PageHeader } from "../../components/sections/shared/PageHeader";
import { BLOG_POSTS } from "../../features/blog/blog.data";
import type { BlogPost } from "../../types";

interface ApiBlog {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string | null;
  images: string[] | null;
  read: string | null;
  date: string | null;
  published_at: string | null;
  excerpt: string | null;
  author: string | null;
}

function mapApiBlog(b: ApiBlog): BlogPost {
  return {
    id: b.id,
    title: b.title,
    slug: b.slug,
    category: b.category,
    date: b.date ?? "",
    image:
      b.image ||
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    read: b.read || "5 min read",
    excerpt: b.excerpt ?? undefined,
    author: b.author ?? undefined,
  };
}

export const BlogPage = () => {
  useScrollReveal();

  useSeo({
    title: "Blog",
    description:
      "Tutorials, architectural deep-dives, and tech updates straight from our engineering team.",
  });

  const { data: apiBlogs } = useApiData<ApiBlog[]>("/blogs", []);

  const blogs: BlogPost[] =
    apiBlogs.length > 0 ? apiBlogs.map(mapApiBlog) : BLOG_POSTS;

  return (
    <div className="pb-24 min-h-screen">
      <PageHeader
        title="Insights & Engineering"
        subtitle="Tutorials, architectural deep-dives, and tech updates straight from our engineering team."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {blogs.map((post, idx) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.slug}
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer flex flex-col sm:flex-row reveal"
              style={{ transitionDelay: `${idx * 150}ms` }}
              id={`blog-card-${idx}`}
            >
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Calendar className="w-3 h-3 mr-1" /> {post.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center text-sm text-gray-500 mt-auto">
                  <span>{post.read}</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
