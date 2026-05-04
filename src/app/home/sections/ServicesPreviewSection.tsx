import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { SERVICES } from "../../../features/services/service.data";

export const ServicesPreviewSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 reveal">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Our Specialized <span className="text-blue-500">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              From concept to deployment, we provide end-to-end technical
              solutions.
            </p>
          </div>
          <Button
            variant="secondary"
            className="mt-6 md:mt-0"
            onClick={() => navigate("/services")}
          >
            All Services
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.slice(0, 3).map((service, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl group glow-border cursor-pointer reveal transition-transform duration-500 hover:-translate-y-2"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
