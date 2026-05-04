import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "light";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  className = "",
  icon,
  ...rest
}: ButtonProps) => {
  const baseStyle =
    "relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold transition-all duration-300 overflow-hidden group text-sm sm:text-base cursor-pointer";
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]",
    secondary:
      "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md",
    light:
      "bg-white text-gray-900 border border-gray-200 hover:border-blue-500 hover:shadow-lg",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <span className="group-hover:translate-x-1 transition-transform">
            {icon}
          </span>
        )}
      </span>
      {variant === "primary" && (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"></div>
      )}
    </button>
  );
};
