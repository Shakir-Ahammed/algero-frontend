import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../../features/testimonials/testimonial.data";

export const TestimonialsSection = () => (
  <section className="py-24 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 reveal">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Client <span className="text-blue-500">Feedback</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Don't just take our word for it. Here is what our partners have to
          say.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial, idx) => (
          <div
            key={testimonial.id}
            className="glass-card p-8 rounded-3xl relative reveal hover:-translate-y-2 transition-transform duration-500"
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <Star className="text-yellow-400 w-8 h-8 mb-6 opacity-50" />
            <p className="text-gray-300 text-lg mb-8 italic">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full border-2 border-blue-500/30 object-cover"
              />
              <div>
                <h4 className="text-white font-bold">
                  {testimonial.author}
                </h4>
                <p className="text-blue-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
