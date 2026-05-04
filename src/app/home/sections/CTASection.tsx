import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center reveal">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight">
          Ready to build something extraordinary?
        </h2>
        <Button
          variant="light"
          className="!py-4 !px-10 !text-lg"
          onClick={() => navigate("/contact")}
        >
          Start a Conversation
        </Button>
      </div>
    </section>
  );
};
