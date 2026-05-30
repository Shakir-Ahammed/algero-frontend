import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Monitor,
  ChevronRight,
  Calendar,
  Tag,
} from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useApiData } from "../../hooks/useApiData";
import { useSeo } from "../../hooks/useSeo";
import { PROJECTS } from "../../features/projects/project.data";
import type { Project } from "../../types";

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const ProjectViewPage = () => {
  useScrollReveal();
  const { slug } = useParams<{ slug: string }>();

  const { data: apiProject, loading } = useApiData<Project | null>(
    `/projects/${slug}`,
    null
  );

  const staticProject = PROJECTS.find(
    (p) => (p.slug || toSlug(p.title)) === slug
  );

  const project: Project | null = apiProject ?? staticProject ?? null;

  // Related projects (same category, different slug)
  const related = PROJECTS.filter(
    (p) =>
      (p.slug || toSlug(p.title)) !== slug &&
      project &&
      p.category === project.category
  ).slice(0, 3);
  const relatedProjects =
    related.length > 0
      ? related
      : PROJECTS.filter((p) => (p.slug || toSlug(p.title)) !== slug).slice(
          0,
          3
        );

  useSeo({
    title: project?.title
      ? `${project.title} — Algero Projects`
      : "Project Detail",
    description: project?.desc ?? "See our work in action.",
    image: project?.image,
    type: "article",
    url: typeof window !== "undefined" ? window.location.href : undefined,
  });

  if (loading && !staticProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold text-white">Project Not Found</h1>
        <p className="text-gray-400">
          The project you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-24 min-h-screen">
      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[50vh] min-h-[400px] max-h-[560px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/50 to-transparent" />

        <div className="absolute top-28 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 reveal">
              <ol className="flex items-center gap-1.5 text-xs text-gray-400">
                <li>
                  <Link
                    to="/"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <ChevronRight className="w-3 h-3 text-gray-600" />
                <li>
                  <Link
                    to="/projects"
                    className="hover:text-white transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <ChevronRight className="w-3 h-3 text-gray-600" />
                <li className="text-gray-500 truncate max-w-[200px]">
                  {project.title}
                </li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-5 reveal reveal-delay-1">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                {project.category}
              </span>
              {project.client && (
                <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Tag className="w-3.5 h-3.5" />
                  {project.client}
                </span>
              )}
              {project.created_at && (
                <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(project.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight reveal reveal-delay-2">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Action Buttons + Tech ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-white/[0.06] reveal">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((t) => (
              <span
                key={t}
                className="text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1.5"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Globe className="w-4 h-4" /> Visit Site
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white text-sm font-semibold rounded-xl border border-white/10 transition-all"
              >
                <Monitor className="w-4 h-4" /> Live Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white text-sm font-semibold rounded-xl border border-white/10 transition-all"
              >
                <GithubIcon className="w-4 h-4" /> Source Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Description ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {project.desc && (
          <p className="text-xl text-gray-300 font-light leading-relaxed mb-10 border-l-2 border-blue-500/40 pl-6 reveal">
            {project.desc}
          </p>
        )}

        {project.content ? (
          <div
            className="blog-content reveal"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        ) : (
          <div className="blog-content reveal">
            <p className="text-gray-300 leading-relaxed">
              Detailed project information will be added soon. Check back later
              for the full case study.
            </p>
          </div>
        )}
      </div>

      {/* ── Image Gallery ── */}
      {project.images && project.images.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-xl font-bold text-white mb-6 reveal">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal">
            {project.images.map((img, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border border-white/[0.06] group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Project Info Card ── */}
      {(project.client || project.url) && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="glass-card rounded-2xl p-8 reveal">
            <h3 className="text-lg font-bold text-white mb-6">
              Project Details
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.client && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                    Client
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {project.client}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                  Category
                </p>
                <p className="text-sm font-semibold text-white">
                  {project.category}
                </p>
              </div>
              {project.tech && project.tech.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                    Tech Stack
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {project.tech.join(", ")}
                  </p>
                </div>
              )}
              {project.url && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                    Website
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                  >
                    Visit <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Related Projects ── */}
      {relatedProjects.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <h2 className="text-2xl font-bold text-white mb-8 reveal">
            Related Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((rp, idx) => (
              <Link
                to={`/projects/${rp.slug || toSlug(rp.title)}`}
                key={rp.id}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer reveal"
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                      {rp.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {rp.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          View All Projects
        </Link>
      </div>
    </article>
  );
};
