import { ArrowRight, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { useApiData } from "../../../hooks/useApiData";
import { BLOG_POSTS } from "../../../features/blog/blog.data";
import type { BlogPost } from "../../../types";

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
}

function mapApiBlog(b: ApiBlog): BlogPost {
  return {
    id: b.id,
    title: b.title,
    slug: b.slug,
    category: b.category,
    date: b.date ?? "",
    image: b.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    read: b.read || "5 min read",
  };
}

export const BlogPreviewSection = () => {
  const navigate = useNavigate();
  const { data: apiBlogs } = useApiData<ApiBlog[]>("/blogs", []);
  const blogs: BlogPost[] = apiBlogs.length > 0 ? apiBlogs.map(mapApiBlog) : BLOG_POSTS;

  return (
    <section className="py-28 border-t border-white/[0.04] bg-[#050b16] relative z-10 section-glow-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="reveal-left">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
              Blog
            </p>
            <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
              Latest Insights
            </h2>
            <p className="text-lg text-gray-400/80 max-w-2xl leading-relaxed">
              Thoughts, tutorials, and tech updates.
            </p>
          </div>
          <div className="reveal-right">
            <Button
              variant="secondary"
              className="mt-6 md:mt-0"
              onClick={() => navigate("/blog")}
            >
              Read Blog
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.slice(0, 2).map((post, idx) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.slug}
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer flex flex-col sm:flex-row reveal card-premium card-highlight"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative img-hover-zoom">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-500/15 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="w-3 h-3 mr-1.5" /> {post.date}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-500 leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-auto">
                  <span>{post.read}</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-3 group-hover:translate-x-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
