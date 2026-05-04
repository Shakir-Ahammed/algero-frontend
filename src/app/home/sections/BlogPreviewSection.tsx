import { ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { BLOG_POSTS } from "../../../features/blog/blog.data";

export const BlogPreviewSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 border-t border-white/5 bg-[#050b16] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              Thoughts, tutorials, and tech updates.
            </p>
          </div>
          <Button
            variant="secondary"
            className="mt-6 md:mt-0"
            onClick={() => navigate("/blog")}
          >
            Read Blog
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {BLOG_POSTS.slice(0, 2).map((post, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer flex flex-col sm:flex-row reveal"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-auto">
                  <span>{post.read}</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
