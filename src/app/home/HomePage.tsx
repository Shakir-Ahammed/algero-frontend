import {
  ArrowRight,
  Play,
  CheckCircle2,
  ChevronRight,
  Star,
  Calendar,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Button } from "../../components/ui/Button";
import { SERVICES } from "../../features/services/service.data";
import { PROJECTS } from "../../features/projects/project.data";
import { BLOG_POSTS } from "../../features/blog/blog.data";
import { TESTIMONIALS } from "../../features/testimonials/testimonial.data";

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage = ({ navigate }: HomePageProps) => {
  useScrollReveal();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 reveal animate-float cursor-pointer hover:bg-blue-500/20 transition-colors">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            New: Algero AI Tool beta is now live
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 reveal reveal-delay-1 leading-[1.1]">
            Build the Future of <br className="hidden md:block" />
            <span className="text-gradient">Digital Products</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 reveal reveal-delay-2 font-light">
            Empowering startups and enterprises with elite software development,
            cutting-edge mobile apps, and visionary UI/UX design.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center reveal reveal-delay-3">
            <Button
              onClick={() => navigate("contact")}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Get Started
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("projects")}
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              View Our Work
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#030712] to-transparent"></div>
      </section>

      <section className="py-12 border-y border-white/5 relative z-10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8 reveal">
            Trusted by Innovative Teams Worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-700 reveal reveal-delay-1">
            {["Vercel", "Stripe", "Linear", "Notion", "Figma"].map(
              (logo, i) => (
                <div
                  key={i}
                  className="text-2xl font-bold text-gray-300 tracking-tighter"
                >
                  {logo}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

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
              onClick={() => navigate("services")}
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
                engineering principles ensure your product can scale from day
                one.
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
                      <span className="text-blue-300">optimize</span>({"{"}
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
                    <div>{"}"};</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gray-50 text-gray-900 rounded-[3rem] mx-2 sm:mx-6 lg:mx-8 my-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[120px] animate-blob opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 reveal">
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-900 text-gradient-dark">
                Featured Work
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Digital experiences engineered for performance and scale.
              </p>
            </div>
            <Button
              variant="light"
              className="mt-6 md:mt-0"
              onClick={() => navigate("projects")}
              icon={<ChevronRight />}
            >
              View All Projects
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {PROJECTS.slice(0, 4).map((project, idx) => (
              <div
                key={project.id}
                className="group cursor-pointer reveal"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative h-[400px] rounded-3xl overflow-hidden mb-8 shadow-xl shadow-gray-200/50">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-transparent transition-colors duration-500"></div>
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-sm font-bold text-white border border-white/30 shadow-lg">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="text-blue-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-extrabold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">{project.desc}</p>
                <div className="flex gap-3 flex-wrap">
                  {project.tech?.map((t) => (
                    <span
                      key={t}
                      className="text-sm font-semibold text-gray-700 bg-gray-200/80 rounded-lg px-3 py-1.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="py-24 border-t border-white/5 bg-[#050b16] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
            <div>
              <h2 className="text-4xl font-extrabold text-white mb-4">
                Latest Insights
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl">
                Thoughts, tutorials, and tech updates.
              </p>
            </div>
            <Button
              variant="secondary"
              className="mt-6 md:mt-0"
              onClick={() => navigate("blog")}
            >
              Read Blog
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {BLOG_POSTS.slice(0, 2).map((post, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl overflow-hidden group cursor-pointer flex flex-col sm:flex-row reveal"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Calendar className="w-3 h-3 mr-1" /> {post.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-auto">
                    <span>{post.read}</span>
                    <ArrowRight className="w-4 h-4 ml-auto text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center reveal">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight">
            Ready to build something extraordinary?
          </h2>
          <Button
            variant="secondary"
            className="!text-blue-900 !bg-white hover:!bg-blue-50 !py-4 !px-10 !text-lg"
            onClick={() => navigate("contact")}
          >
            Start a Conversation
          </Button>
        </div>
      </section>
    </div>
  );
};
