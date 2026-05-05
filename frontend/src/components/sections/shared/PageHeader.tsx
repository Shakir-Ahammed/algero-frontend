import type { FC, ReactNode } from "react";
import { useScrollReveal } from "../../../hooks/useScrollReveal";

interface PageHeaderProps {
  title: string | ReactNode;
  subtitle: string;
  label?: string;
}

export const PageHeader: FC<PageHeaderProps> = ({ title, subtitle, label }) => {
  useScrollReveal();

  return (
    <div className="pt-40 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full filter blur-[100px] pointer-events-none"></div>

      {label && (
        <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.2em] mb-5 reveal relative z-10">
          {label}
        </p>
      )}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 text-gradient-animate leading-[1.1] reveal reveal-delay-1 relative z-10">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-400/80 max-w-3xl mx-auto font-light leading-relaxed reveal reveal-delay-2 relative z-10">
        {subtitle}
      </p>
    </div>
  );
};
