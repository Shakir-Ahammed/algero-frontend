import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { SERVICES } from "../../../features/services/service.data";

export const ServicesPreviewSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 relative z-10 section-glow-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="reveal-left">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
              What We Do
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Our Specialized{" "}
              <span className="text-gradient">Services</span>
            </h2>
            <p className="text-lg text-gray-400/80 max-w-2xl leading-relaxed">
              From concept to deployment, we provide end-to-end technical
              solutions.
            </p>
          </div>
          <div className="reveal-right">
            <Button
              variant="secondary"
              className="mt-6 md:mt-0"
              onClick={() => navigate("/services")}
            >
              All Services
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.slice(0, 3).map((service, idx) => (
            <div
              key={idx}
              className="glass-card card-premium p-8 rounded-3xl group glow-border cursor-pointer reveal"
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <div className="w-14 h-14 bg-blue-500/[0.08] border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-gray-400/80 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
