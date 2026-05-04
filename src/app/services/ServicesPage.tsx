import { CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { PageHeader } from "../../components/sections/shared/PageHeader";
import { SERVICES } from "../../features/services/service.data";

export const ServicesPage = () => {
  useScrollReveal();
  return (
    <div className="pb-24 min-h-screen">
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive, end-to-end technical solutions designed to scale your business and outpace the competition."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl group hover:border-blue-500/50 transition-all duration-500 reveal"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {service.desc}
              </p>
              <ul className="space-y-3 border-t border-white/10 pt-6">
                {[
                  "Strategic Planning",
                  "Agile Implementation",
                  "Ongoing Maintenance",
                ].map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center text-sm text-gray-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-3" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
