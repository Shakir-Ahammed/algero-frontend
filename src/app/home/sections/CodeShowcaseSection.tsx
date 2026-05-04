import { CheckCircle2 } from "lucide-react";

export const CodeShowcaseSection = () => (
  <section className="py-32 relative z-10 bg-[#0a0f1c] border-y border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="reveal">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Built for the future. <br />
            <span className="text-blue-500">Delivered today.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            We don't just write code; we build resilient architectures. Our
            engineering principles ensure your product can scale from day one.
          </p>
          <div className="space-y-6">
            {[
              "Zero-downtime deployments & CI/CD pipelines.",
              "Pixel-perfect, accessible UI components.",
              "Enterprise-grade security standards.",
              "Dedicated post-launch support & scaling.",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <CheckCircle2 className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                <span className="text-gray-300 font-medium text-lg">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative reveal reveal-delay-2 perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
          <div className="glass-card p-1 border border-white/20 rounded-3xl relative z-10 transform transition-transform duration-500 hover:rotate-y-[-5deg] hover:rotate-x-[5deg]">
            <div className="bg-[#0D1117] rounded-[22px] overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                <div className="ml-4 text-xs font-mono text-gray-500">
                  architecture.ts — Algero
                </div>
              </div>
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
