import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-48 relative overflow-hidden noise-overlay">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 animate-gradient bg-[length:200%_200%]"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Decorative orbs */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-cyan-400/20 rounded-full filter blur-[100px] animate-blob"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-purple-400/15 rounded-full filter blur-[100px] animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center reveal">
        <p className="text-sm font-semibold text-blue-200/80 uppercase tracking-[0.2em] mb-6">
          Let's Build Together
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight leading-[1.1]">
          Ready to build something{" "}
          <span className="italic">extraordinary</span>?
        </h2>
        <p className="text-lg text-blue-100/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Let's discuss your vision and turn it into a world-class digital product.
        </p>
        <Button
          variant="light"
          className="!py-4 !px-10 !text-base !font-bold !shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          onClick={() => navigate("/contact")}
          icon={<ArrowRight className="w-5 h-5" />}
        >
          Start a Conversation
        </Button>
      </div>
    </section>
  );
};
