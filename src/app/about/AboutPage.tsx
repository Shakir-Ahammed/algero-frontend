import { PageHeader } from "../../components/sections/shared/PageHeader";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export const AboutPage = () => {
  useScrollReveal();
  return (
    <div className="pb-24 min-h-screen">
      <PageHeader
        title="About Algero"
        subtitle="We are a collective of elite engineers, designers, and strategists dedicated to pushing the boundaries of what technology can achieve."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-20 reveal">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt="Team collaborating"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <h3 className="text-3xl font-bold mb-6 text-white">
              Our Mission & Vision
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
              To empower businesses with technology that not only solves today's
              problems but anticipates tomorrow's challenges. We believe in
              writing clean code, designing intuitive interfaces, and building
              resilient systems that stand the test of time.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              Unlike traditional agencies, we operate as an extension of your
              team. We challenge assumptions, propose optimal architectures, and
              care deeply about your product's success in the real world.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 reveal reveal-delay-2">
            {[
              { stat: "10+", label: "Years Experience" },
              { stat: "150+", label: "Projects Delivered" },
              { stat: "99%", label: "Client Retention" },
              { stat: "24/7", label: "Global Support" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card p-8 rounded-2xl text-center border-t border-blue-500/30 hover:-translate-y-2 transition-transform"
              >
                <div className="text-4xl font-extrabold text-blue-500 mb-2">
                  {item.stat}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
