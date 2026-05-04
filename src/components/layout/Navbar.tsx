import { Menu, X } from "lucide-react";
import { ExactLogo } from "../ui/ExactLogo";
import { Button } from "../ui/Button";

export interface NavLink {
  id: string;
  label: string;
}

interface NavbarProps {
  currentRoute: string;
  navLinks: NavLink[];
  scrolled: boolean;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate: (route: string) => void;
}

export const Navbar = ({
  currentRoute,
  navLinks,
  scrolled,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
}: NavbarProps) => (
  <header
    className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? "py-3" : "py-6"
    }`}
  >
    {scrolled && (
      <div className="absolute inset-0 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 -z-10 shadow-2xl"></div>
    )}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div onClick={() => onNavigate("home")}>
        <ExactLogo />
      </div>

      <nav className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`text-sm font-semibold transition-all hover:text-blue-400 ${
              currentRoute === link.id
                ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                : "text-gray-300"
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <Button
          variant="primary"
          onClick={() => onNavigate("contact")}
          className="!py-2 !px-6 !text-sm"
        >
          Get Started
        </Button>
      </div>

      <button
        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors border border-white/10"
        onClick={onToggleMobileMenu}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>
    </div>

    {isMobileMenuOpen && (
      <div className="md:hidden absolute top-full left-0 w-full bg-[#0D1117] border-b border-white/10 py-6 px-4 flex flex-col gap-4 shadow-2xl">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`text-left text-lg font-semibold py-3 border-b border-white/5 ${
              currentRoute === link.id ? "text-blue-500" : "text-gray-300"
            }`}
          >
            {link.label}
          </button>
        ))}
        <Button
          variant="primary"
          onClick={() => onNavigate("contact")}
          className="w-full mt-4"
        >
          Get Started
        </Button>
      </div>
    )}
  </header>
);
