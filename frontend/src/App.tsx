import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { SpaceBackground, CursorGlow } from "./components/background";
import { HomePage } from "./app/home/HomePage";
import { AboutPage } from "./app/about/AboutPage";
import { ServicesPage } from "./app/services/ServicesPage";
import { ProjectsPage } from "./app/projects/ProjectsPage";
import { TeamPage } from "./app/team/TeamPage";
import { BlogPage } from "./app/blog/BlogPage";
import { ContactPage } from "./app/contact/ContactPage";

export default function App() {
  return (
    <div className="font-sans antialiased bg-[#030712] text-gray-100 selection:bg-blue-500/30 selection:text-blue-200">
      {/* ── Cinematic Space Background (Canvas) ── */}
      <SpaceBackground />
      <CursorGlow />

      <ScrollToTop />
      <Navbar />

      <main className="flex-grow relative z-[2]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
