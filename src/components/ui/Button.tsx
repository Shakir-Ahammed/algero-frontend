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
    "relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold overflow-hidden group text-sm sm:text-base cursor-pointer btn-press btn-shimmer transition-all duration-500";
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-[length:200%_auto] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:bg-[100%_auto]",
    secondary:
      "bg-white/[0.06] text-white border border-white/[0.12] hover:bg-white/[0.12] hover:border-white/[0.2] backdrop-blur-md",
    light:
      "bg-white text-gray-900 border border-gray-200 hover:border-blue-400 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      data-magnetic=""
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon && (
          <span className="group-hover:translate-x-1.5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            {icon}
          </span>
        )}
      </span>
      {variant === "primary" && (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0"></div>
      )}
    </button>
  );
};
