import { useRef, useCallback } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { PageHeader } from "../../components/sections/shared/PageHeader";
import { SERVICES } from "../../features/services/service.data";
import { Button } from "../../components/ui/Button";

const ServiceCard = ({
  service,
  idx,
}: {
  service: (typeof SERVICES)[0];
  idx: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2.5;
      const rotateY = ((x - centerX) / centerX) * 2.5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
      // Update glow position
      const glow = card.querySelector<HTMLDivElement>(".card-glow");
      if (glow) {
        glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(59,130,246,0.12), transparent 60%)`;
      }
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
    const glow = card.querySelector<HTMLDivElement>(".card-glow");
    if (glow) {
      glow.style.background = "";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative glass-card rounded-3xl group glow-border cursor-pointer reveal will-change-transform"
      style={{
        transitionDelay: `${idx * 80}ms`,
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mouse-following glow */}
      <div className="card-glow absolute inset-0 rounded-3xl pointer-events-none transition-[background] duration-300 z-0"></div>

      <div className="relative z-10 p-8">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 animate-gradient bg-[length:200%_200%] transition-opacity duration-500"></div>
          <service.icon className="w-7 h-7 text-white relative z-10 group-hover:scale-110 group-hover:rotate-[5deg] transition-transform duration-500" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-500">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400/80 mb-7 leading-relaxed text-[15px]">
          {service.desc}
        </p>

        {/* Features */}
        <ul className="space-y-3 border-t border-white/[0.06] pt-6">
          {(service.features ?? []).map((feat, i) => (
            <li
              key={i}
              className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-500"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400/70 mr-3 flex-shrink-0" />
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const ServicesPage = () => {
  const navigate = useNavigate();
  useScrollReveal();

  return (
    <div className="pb-0 min-h-screen relative noise-overlay">
      {/* Background layers */}
      <div className="floating-orb top-[20%] left-[5%] w-[500px] h-[500px] bg-blue-600/8 animate-glow-pulse"></div>
      <div className="floating-orb top-[50%] right-[5%] w-[400px] h-[400px] bg-cyan-600/6 animate-glow-pulse animation-delay-2000"></div>
      <div className="floating-orb bottom-[10%] left-[30%] w-[350px] h-[350px] bg-purple-600/5 animate-glow-pulse animation-delay-4000"></div>

      <PageHeader
        label="What We Offer"
        title="Our Services"
        subtitle="Comprehensive, end-to-end technical solutions designed to scale your business and outpace the competition."
      />

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={idx} service={service} idx={idx} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-[#0a1628] to-cyan-600/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="floating-orb top-0 left-[20%] w-[350px] h-[350px] bg-blue-500/10"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center reveal">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
            Let's Collaborate
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Need a <span className="text-gradient-animate">custom solution</span>?
          </h2>
          <p className="text-lg text-gray-400/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every project is unique. Tell us about your challenges, and we'll
            design an architecture that fits your scale and ambition.
          </p>
          <Button
            onClick={() => navigate("/contact")}
            icon={<ArrowRight className="w-5 h-5" />}
            className="!py-4 !px-10 !text-base"
          >
            Start a Project
          </Button>
        </div>
      </div>
    </div>
  );
};
