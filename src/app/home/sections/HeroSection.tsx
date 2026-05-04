import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
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
      </div>
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#030712] to-transparent"></div>
    </section>
  );
};
