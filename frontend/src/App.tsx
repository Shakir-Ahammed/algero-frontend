import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { SpaceBackground, CursorGlow } from "./components/background";
import { HomePage } from "./app/home/HomePage";
import { AboutPage } from "./app/about/AboutPage";
import { ServicesPage } from "./app/services/ServicesPage";
import { ProjectsPage } from "./app/projects/ProjectsPage";
import { ProjectViewPage } from "./app/projects/ProjectViewPage";
import { TeamPage } from "./app/team/TeamPage";
import { BlogPage } from "./app/blog/BlogPage";
import { BlogViewPage } from "./app/blog/BlogViewPage";
import { ContactPage } from "./app/contact/ContactPage";

import { AuthProvider } from "./features/admin/contexts/AuthContext";
import { AdminLayout } from "./features/admin/components/AdminLayout";
import { ProtectedRoute } from "./features/admin/components/ProtectedRoute";
import { LoginPage } from "./features/admin/pages/LoginPage";
import { RegisterPage } from "./features/admin/pages/RegisterPage";
import { DashboardPage } from "./features/admin/pages/DashboardPage";
import { BlogsPage } from "./features/admin/pages/BlogsPage";
import { TeamPage as AdminTeamPage } from "./features/admin/pages/TeamPage";
import { ServicesPage as AdminServicesPage } from "./features/admin/pages/ServicesPage";
import { ProjectsPage as AdminProjectsPage } from "./features/admin/pages/ProjectsPage";
import { SubscribersPage } from "./features/admin/pages/SubscribersPage";
import { LeadsPage } from "./features/admin/pages/LeadsPage";
import { ApprovalsPage } from "./features/admin/pages/ApprovalsPage";
import { UsersPage } from "./features/admin/pages/UsersPage";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/*"
        element={
          <div className="font-sans antialiased bg-[#030712] text-gray-100 selection:bg-blue-500/30 selection:text-blue-200">
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
                <Route path="/projects/:slug" element={<ProjectViewPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogViewPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        }
      />

      {/* Admin routes */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/register" element={<RegisterPage />} />
      <Route
        path="/admin"
        element={
          <AuthProvider>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </AuthProvider>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="team" element={<AdminTeamPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="projects" element={<AdminProjectsPage />} />
        <Route path="subscribers" element={<SubscribersPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}
