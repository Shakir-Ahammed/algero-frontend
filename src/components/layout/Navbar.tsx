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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? "py-2.5" : "py-5"
      }`}
    >
      {scrolled && (
        <div className="absolute inset-0 nav-glass -z-10 transition-all duration-700"></div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" aria-label="Algero Home">
          <ExactLogo />
        </Link>

        <nav className="hidden md:flex items-center gap-1 nav-pill px-2 py-1.5 rounded-full">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `nav-link text-sm font-medium px-4 py-2 rounded-full transition-all duration-400 ${
                  isActive
                    ? "nav-link-active text-blue-400 bg-blue-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/contact">
            <Button variant="primary" className="!py-2.5 !px-6 !text-sm">
              Get Started
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2.5 text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#0D1117]/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen
            ? "max-h-[500px] opacity-100 py-6"
            : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="px-4 flex flex-col gap-1">
          {NAV_LINKS.map((link, idx) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-left text-base font-medium py-3.5 px-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-gray-300 hover:bg-white/5"
                }`
              }
              style={{ transitionDelay: isMobileMenuOpen ? `${idx * 50}ms` : "0ms" }}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="w-full mt-3">
            <Button variant="primary" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
