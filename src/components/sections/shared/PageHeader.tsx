import type { FC, ReactNode } from "react";
import { useScrollReveal } from "../../../hooks/useScrollReveal";

interface PageHeaderProps {
  title: string | ReactNode;
  subtitle: string;
}

export const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => {
  useScrollReveal();

  return (
    <div className="pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 text-gradient">
        {title}
      </h1>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};
