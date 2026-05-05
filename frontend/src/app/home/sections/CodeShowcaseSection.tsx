import { CheckCircle2 } from "lucide-react";

export const CodeShowcaseSection = () => (
  <section className="py-32 relative z-10 bg-[#060d1b] border-y border-white/[0.04] section-glow-top overflow-hidden">
    {/* Decorative */}
    <div className="floating-orb -bottom-20 -right-20 w-[400px] h-[400px] bg-blue-600/10 animate-glow-pulse"></div>
    <div className="mesh-gradient"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="reveal-left">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
            Why Algero
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Built for the future. <br />
            <span className="text-gradient">Delivered today.</span>
          </h2>
          <p className="text-lg text-gray-400/80 mb-10 leading-relaxed">
            We don't just write code; we build resilient architectures. Our
            engineering principles ensure your product can scale from day one.
          </p>
          <div className="space-y-4">
            {[
              "Zero-downtime deployments & CI/CD pipelines.",
              "Pixel-perfect, accessible UI components.",
              "Enterprise-grade security standards.",
              "Dedicated post-launch support & scaling.",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500 group reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <CheckCircle2 className="w-5 h-5 text-blue-400 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-300/90 font-medium text-[15px]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative reveal-right">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl opacity-30 animate-glow-pulse"></div>
          <div className="glass-card p-[2px] rounded-3xl relative z-10 group">
            <div className="bg-[#0D1117] rounded-[22px] overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-6 py-4 bg-white/[0.03] border-b border-white/[0.05]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="ml-4 text-xs font-mono text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
                  architecture.ts — Algero
                </div>
              </div>
              {/* Code content */}
              <div className="p-8 font-mono text-sm sm:text-base text-gray-300 space-y-4 overflow-x-auto">
                <div>
                  <span className="text-purple-400">import</span>{" "}
                  {"{ Scalability, Performance }"}{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-400">'@algero/core'</span>;
                </div>
                <br />
                <div>
                  <span className="text-blue-400">const</span>{" "}
                  <span className="text-yellow-200">buildSystem</span> ={" "}
                  <span className="text-purple-400">async</span> () ={">"}{" "}
                  {"{"}
                </div>
                <div className="pl-6">
                  <span className="text-blue-400">const</span> infra ={" "}
                  <span className="text-purple-400">new</span>{" "}
                  <span className="text-yellow-200">Scalability</span>();
                </div>
                <div className="pl-6">
                  <span className="text-purple-400">await</span> infra.
                  <span className="text-blue-300">optimize</span>({"{"})
                </div>
                <div className="pl-12">
                  loadBalancing:{" "}
                  <span className="text-orange-400">true</span>,
                </div>
                <div className="pl-12">
                  security:{" "}
                  <span className="text-green-400">'enterprise-grade'</span>
                </div>
                <div className="pl-6">{"}"});</div>
                <div className="pl-6">
                  <span className="text-purple-400">return</span> infra.
                  <span className="text-blue-300">deployToProduction</span>
                  ();
                </div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
