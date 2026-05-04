import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ExactLogo } from "../ui/ExactLogo";
import { Button } from "../ui/Button";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Work" },
  { to: "/team", label: "Team" },
  { to: "/blog", label: "Blog" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-all hover:text-blue-400 ${
      isActive
        ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        : "text-gray-300"
    }`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      {scrolled && (
        <div className="absolute inset-0 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 -z-10 shadow-2xl"></div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" aria-label="Algero Home">
          <ExactLogo />
        </Link>

        <nav className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/contact">
            <Button variant="primary" className="!py-2 !px-6 !text-sm">
              Get Started
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors border border-white/10"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0D1117] border-b border-white/10 py-6 px-4 flex flex-col gap-4 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-left text-lg font-semibold py-3 border-b border-white/5 ${
                  isActive ? "text-blue-500" : "text-gray-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="w-full mt-4">
            <Button variant="primary" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};
