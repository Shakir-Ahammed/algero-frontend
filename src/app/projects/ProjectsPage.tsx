import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { PageHeader } from "../../components/sections/shared/PageHeader";
import { PROJECTS } from "../../features/projects/project.data";
import { apiFetch } from "../../lib/api";
import type { Project } from "../../types";
import { useSeo } from "../../hooks/useSeo";

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const ProjectsPage = () => {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const categories = ["All", "Web App", "Mobile App", "UI/UX", "DevOps"];
  useScrollReveal();
  useSeo({
    title: "Our Work — Software & App Projects by Algero",
    description: "See the web applications, mobile apps, and cloud platforms Algero has built for startups and enterprises. Real projects, real results.",
  });

  useEffect(() => {
    apiFetch<Project[]>("/projects")
      .then((data) => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch(() => {
        // Fallback to static data silently
      });
  }, []);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="pb-24 min-h-screen">
      <PageHeader
        title="Projects We've Shipped"
        subtitle="Web applications, mobile apps, and cloud platforms we've built for startups and enterprises."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 mb-16 reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <Link
              to={`/projects/${project.slug || toSlug(project.title)}`}
              key={project.id}
              className="group cursor-pointer reveal block"
              style={{ transitionDelay: `${(idx % 3) * 150}ms` }}
            >
              <div className="relative h-72 rounded-2xl overflow-hidden mb-6 border border-white/10">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="absolute inset-0 bg-[#030712]/40 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-center">
                  <span className="px-3 py-1 bg-blue-600 text-xs font-bold text-white rounded-full">
                    {project.category}
                  </span>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {project.desc}
              </p>
              <div className="flex gap-2 flex-wrap">
                {project.tech?.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-md px-2 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

