import logoSvg from "../../assets/images/Algero Logo-01.svg";

export const ExactLogo = () => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <img
      src={logoSvg}
      alt="Algero Logo"
      className="w-10 h-10 transition-transform duration-500 group-hover:rotate-[360deg]"
    />
    <span
      className="text-[1.6rem] font-bold tracking-wide text-white group-hover:text-blue-400 transition-colors duration-300"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      Algero
    </span>
  </div>
);
