import {
  Award,
  Clock,
  Globe2,
  Rocket,
  Target,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/sections/shared/PageHeader";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Button } from "../../components/ui/Button";

const STATS = [
  { stat: "10+", label: "Years Experience", icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { stat: "150+", label: "Projects Delivered", icon: Rocket, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { stat: "99%", label: "Client Retention", icon: Award, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { stat: "24/7", label: "Global Support", icon: Globe2, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
];

const VALUES = [
  { title: "Ship with confidence", desc: "Every line of code is reviewed, tested, and optimized for production." },
  { title: "Design for humans", desc: "Interfaces that feel intuitive from the very first interaction." },
  { title: "Scale from day one", desc: "Architectures built to handle 10x growth without re-engineering." },
];

export const AboutPage = () => {
  const navigate = useNavigate();
  useScrollReveal();

  return (
    <div className="pb-24 min-h-screen relative">
      {/* Background decorative elements */}
      <div className="floating-orb top-[30%] right-[5%] w-[400px] h-[400px] bg-blue-600/8 animate-glow-pulse"></div>
      <div className="floating-orb bottom-[20%] left-[5%] w-[350px] h-[350px] bg-purple-600/6 animate-glow-pulse animation-delay-3000"></div>

      <PageHeader
        label="About Us"
        title="About Algero"
        subtitle="We are a collective of elite engineers, designers, and strategists dedicated to pushing the boundaries of what technology can achieve."
      />

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-28 reveal-scale img-hover-zoom">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt="Team collaborating"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent"></div>
          {/* Floating stat on image */}
          <div className="absolute bottom-6 left-6 glass-card rounded-xl px-5 py-3 border border-white/[0.1]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-500/15 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">50+ Engineers</div>
                <div className="text-gray-400 text-[10px] uppercase tracking-wider">Across 8 Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section — Asymmetric Layout */}
        <div className="grid md:grid-cols-5 gap-16 lg:gap-20 items-start mb-28">
          {/* Left — Text (3 cols) */}
          <div className="md:col-span-3 reveal-left">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 leading-tight">
              We don't just build software.{" "}
              <span className="text-gradient">We engineer your competitive edge.</span>
            </h2>
            <p className="text-gray-400/90 mb-6 leading-relaxed text-lg">
              To empower businesses with technology that not only solves today's
              problems but anticipates tomorrow's challenges. We believe in
              writing clean code, designing intuitive interfaces, and building
              resilient systems that stand the test of time.
            </p>
            <p className="text-gray-400/90 leading-relaxed text-lg mb-10">
              Unlike traditional agencies, we operate as an extension of your
              team. We challenge assumptions, propose optimal architectures, and
              care deeply about your product's success in the real world.
            </p>
            <Button
              onClick={() => navigate("/contact")}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Work With Us
            </Button>
          </div>

          {/* Right — Stats (2 cols) */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4 reveal-right">
            {STATS.map((item, i) => (
              <div
                key={i}
                className={`glass-card card-premium glow-border p-6 rounded-2xl text-center reveal`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={`w-10 h-10 ${item.bg} border ${item.border} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className={`text-3xl font-extrabold ${item.color} mb-1`}>
                  {item.stat}
                </div>
                <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-28 section-glow-top pt-20">
          <div className="text-center mb-16 reveal">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
              Our Principles
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              What drives us <span className="text-gradient">every day</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <div
                key={i}
                className="glass-card card-premium p-8 rounded-2xl group reveal"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-500">
                  {value.title}
                </h3>
                <p className="text-gray-400/80 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Algero — Visual CTA */}
        <div className="relative rounded-3xl overflow-hidden reveal-scale">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-[#0a1628] to-purple-600/10"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="floating-orb top-0 right-0 w-[300px] h-[300px] bg-blue-500/15"></div>

          <div className="relative z-10 py-20 px-8 md:px-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500/15 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm font-semibold text-blue-400 uppercase tracking-[0.15em]">
                  Why Algero
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
                Your product deserves a team that{" "}
                <span className="italic text-blue-300">truly cares.</span>
              </h3>
              <p className="text-gray-400/80 text-lg leading-relaxed max-w-xl">
                We're not a feature factory. We're your long-term technology
                partner — invested in your success from first commit to IPO.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                onClick={() => navigate("/contact")}
                icon={<ArrowRight className="w-5 h-5" />}
                className="!py-4 !px-10 !text-base"
              >
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
