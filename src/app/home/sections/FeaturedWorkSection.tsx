import { useState, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { PROJECTS } from "../../../features/projects/project.data";
import { apiFetch } from "../../../lib/api";
import type { Project } from "../../../types";

export const FeaturedWorkSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    apiFetch<Project[]>("/projects")
      .then((data) => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch(() => {});
  }, []);

  const heroProject = projects[0];
  const otherProjects = projects.slice(1, 4);

  return (
    <section className="py-32 bg-gray-50 text-gray-900 rounded-[3rem] mx-2 sm:mx-6 lg:mx-8 my-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[120px] animate-blob opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-3000 opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="reveal-left">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">
              Portfolio
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-gradient-dark leading-tight">
              Featured Work
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl">
              Digital experiences engineered for performance and scale.
            </p>
          </div>
          <div className="reveal-right">
            <Button
              variant="light"
              className="mt-6 md:mt-0"
              onClick={() => navigate("/projects")}
              icon={<ChevronRight />}
            >
              View All Projects
            </Button>
          </div>
        </div>

        {/* Hero Project — Full Width */}
        <div
          className="group cursor-pointer mb-12 reveal"
          onClick={() => navigate("/projects")}
        >
          <div className="relative h-[320px] sm:h-[420px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/40 img-hover-zoom">
            <div
              className="img-inner absolute inset-0"
              style={{
                backgroundImage: `url(${heroProject.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent group-hover:from-gray-900/50 transition-all duration-700"></div>

            {/* Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 shadow-lg tracking-wide uppercase">
                {heroProject.category}
              </span>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3 group-hover:text-blue-200 transition-colors duration-500">
                {heroProject.title}
              </h3>
              <p className="text-gray-200/80 text-lg mb-5 max-w-2xl">
                {heroProject.desc}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex gap-2 flex-wrap">
                  {heroProject.tech?.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold text-white/80 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="ml-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                  <ArrowRight className="text-blue-600 w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects — 3 Column Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {otherProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group cursor-pointer reveal"
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <div className="relative h-[250px] rounded-2xl overflow-hidden mb-5 shadow-lg shadow-gray-200/40 img-hover-zoom">
                <div
                  className="img-inner absolute inset-0"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gray-900/15 group-hover:bg-gray-900/5 transition-all duration-700"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-gray-900 shadow-md tracking-wide uppercase">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                  <ArrowRight className="text-blue-600 w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-500">
                {project.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{project.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tech?.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-semibold text-gray-600 bg-gray-100 rounded-md px-2.5 py-1 border border-gray-200/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
