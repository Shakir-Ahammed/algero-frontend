import { ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { PROJECTS } from "../../../features/projects/project.data";

export const FeaturedWorkSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 bg-gray-50 text-gray-900 rounded-[3rem] mx-2 sm:mx-6 lg:mx-8 my-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[120px] animate-blob opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 reveal">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-900 text-gradient-dark">
              Featured Work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Digital experiences engineered for performance and scale.
            </p>
          </div>
          <Button
            variant="light"
            className="mt-6 md:mt-0"
            onClick={() => navigate("/projects")}
            icon={<ChevronRight />}
          >
            View All Projects
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {PROJECTS.slice(0, 4).map((project, idx) => (
            <div
              key={project.id}
              className="group cursor-pointer reveal"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="relative h-[400px] rounded-3xl overflow-hidden mb-8 shadow-xl shadow-gray-200/50">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-sm font-bold text-white border border-white/30 shadow-lg">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowRight className="text-blue-600" />
                </div>
              </div>
              <h3 className="text-3xl font-extrabold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">{project.desc}</p>
              <div className="flex gap-3 flex-wrap">
                {project.tech?.map((t) => (
                  <span
                    key={t}
                    className="text-sm font-semibold text-gray-700 bg-gray-200/80 rounded-lg px-3 py-1.5"
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
