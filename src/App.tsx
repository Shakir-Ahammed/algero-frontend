import React, { useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { globalStyles } from "./styles/globalStyles";
import { HomePage } from "./app/home/HomePage";
import { AboutPage } from "./app/about/AboutPage";
import { ServicesPage } from "./app/services/ServicesPage";
import { ProjectsPage } from "./app/projects/ProjectsPage";
import { TeamPage } from "./app/team/TeamPage";
import { BlogPage } from "./app/blog/BlogPage";
import { ContactPage } from "./app/contact/ContactPage";

type RouteKey =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "team"
  | "blog"
  | "contact";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteKey>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (route: RouteKey) => {
    setCurrentRoute(route);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Work" },
    { id: "team", label: "Team" },
    { id: "blog", label: "Blog" },
  ];

  const renderPage = () => {
    switch (currentRoute) {
      case "home":
        return <HomePage navigate={navigate} />;
      case "about":
        return <AboutPage />;
      case "services":
        return <ServicesPage />;
      case "projects":
        return <ProjectsPage />;
      case "team":
        return <TeamPage />;
      case "blog":
        return <BlogPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="font-sans antialiased bg-[#030712] text-gray-100 selection:bg-blue-500/30 selection:text-blue-200">
      <style>{globalStyles}</style>

      <Navbar
        currentRoute={currentRoute}
        navLinks={navLinks}
        scrolled={scrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((open) => !open)}
        onNavigate={(route) => navigate(route as RouteKey)}
      />

      <main className="flex-grow">{renderPage()}</main>

      <Footer onNavigate={(route) => navigate(route as RouteKey)} />
    </div>
  );
}
