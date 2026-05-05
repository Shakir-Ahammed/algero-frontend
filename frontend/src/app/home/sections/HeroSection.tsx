import { ArrowRight, Play, TrendingUp, Users, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden noise-overlay">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15"></div>

      {/* Animated mesh gradient */}
      <div className="mesh-gradient"></div>

      {/* Animated gradient orbs */}
      <div className="floating-orb top-[10%] left-[5%] w-[500px] h-[500px] bg-blue-600/15 animate-glow-pulse"></div>
      <div className="floating-orb bottom-[20%] right-[5%] w-[400px] h-[400px] bg-purple-600/10 animation-delay-2000 animate-glow-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-blue-500/[0.08] border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 reveal animate-float cursor-pointer hover:bg-blue-500/15 transition-all duration-500">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              New: Algero AI Tool beta is now live
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight mb-7 reveal reveal-delay-1 leading-[1.08]">
              Build the Future of{" "}
              <span className="text-gradient-animate">Digital Products</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-400/90 max-w-lg mb-10 reveal reveal-delay-2 font-light leading-relaxed">
              Empowering startups and enterprises with elite software
              development, cutting-edge mobile apps, and visionary UI/UX design.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14 reveal reveal-delay-3">
              <Button
                onClick={() => navigate("/contact")}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Get Started
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/projects")}
                icon={<Play className="w-4 h-4 fill-current" />}
              >
                View Our Work
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 md:gap-14 reveal reveal-delay-4">
              {[
                { value: "150+", label: "Projects" },
                { value: "99%", label: "Retention" },
                { value: "10+", label: "Years" },
              ].map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-[0.15em] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual Anchor */}
          <div className="relative reveal-right reveal-delay-2 hidden lg:block">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-purple-500/15 rounded-[2rem] blur-3xl scale-110 animate-glow-pulse"></div>

            {/* Main dashboard card */}
            <div className="relative z-10 glass-card rounded-[1.5rem] p-6 border border-white/[0.08]">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                </div>
                <div className="ml-3 text-[11px] font-mono text-gray-500">
                  dashboard.algero.io
                </div>
              </div>

              {/* Metric cards row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { icon: TrendingUp, label: "Revenue", value: "$2.4M", change: "+24%", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { icon: Users, label: "Users", value: "48.2K", change: "+12%", color: "text-blue-400", bg: "bg-blue-500/10" },
                  { icon: Zap, label: "Uptime", value: "99.9%", change: "SLA", color: "text-amber-400", bg: "bg-amber-500/10" },
                ].map((metric, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 hover:bg-white/[0.06] transition-all duration-500"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    <div className={`w-7 h-7 ${metric.bg} rounded-lg flex items-center justify-center mb-2.5`}>
                      <metric.icon className={`w-3.5 h-3.5 ${metric.color}`} />
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{metric.label}</div>
                    <div className="text-lg font-bold text-white">{metric.value}</div>
                    <div className={`text-[10px] font-semibold ${metric.color} mt-0.5`}>{metric.change}</div>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-400">Performance Overview</span>
                  <span className="text-[10px] text-gray-500 bg-white/[0.05] px-2 py-1 rounded-md">Last 7 days</span>
                </div>
                {/* SVG mini chart */}
                <svg viewBox="0 0 400 100" className="w-full h-20 overflow-visible">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
                      <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,80 C40,75 60,60 100,50 C140,40 160,65 200,35 C240,5 260,25 300,15 C340,5 370,20 400,10"
                    fill="none"
                    stroke="rgba(59,130,246,0.8)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,80 C40,75 60,60 100,50 C140,40 160,65 200,35 C240,5 260,25 300,15 C340,5 370,20 400,10 L400,100 L0,100 Z"
                    fill="url(#chartGradient)"
                  />
                </svg>
              </div>
            </div>

            {/* Floating mini card — top right */}
            <div className="absolute -top-4 -right-4 z-20 glass-card rounded-xl p-3 border border-white/[0.1] animate-float shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-green-500/15 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Security</div>
                  <div className="text-xs font-bold text-green-400">Protected</div>
                </div>
              </div>
            </div>

            {/* Floating mini card — bottom left */}
            <div className="absolute -bottom-3 -left-3 z-20 glass-card rounded-xl p-3 border border-white/[0.1] animate-float animation-delay-2000 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-blue-500/15 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Deploy</div>
                  <div className="text-xs font-bold text-blue-400">Live in 2s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent"></div>
    </section>
  );
};
