import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../../features/testimonials/testimonial.data";

export const TestimonialsSection = () => (
  <section className="py-28 relative z-10 section-glow-top">
    {/* Decorative */}
    <div className="floating-orb top-1/4 right-[10%] w-[300px] h-[300px] bg-blue-600/10 animate-glow-pulse"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20 reveal">
        <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
          Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
          Client <span className="text-gradient">Feedback</span>
        </h2>
        <p className="text-lg text-gray-400/80 max-w-2xl mx-auto leading-relaxed">
          Don't just take our word for it. Here is what our partners have to say.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial, idx) => (
          <div
            key={testimonial.id}
            className="glass-card card-premium card-highlight p-8 rounded-3xl relative reveal group"
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            {/* Quote icon */}
            <div className="absolute top-6 right-6 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500">
              <Quote className="w-16 h-16 text-blue-400" />
            </div>

            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-gray-300/90 text-base mb-8 leading-relaxed">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/[0.06]">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-11 h-11 rounded-full border-2 border-blue-500/20 object-cover"
              />
              <div>
                <h4 className="text-white font-semibold text-sm">
                  {testimonial.author}
                </h4>
                <p className="text-blue-400/80 text-xs font-medium">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
