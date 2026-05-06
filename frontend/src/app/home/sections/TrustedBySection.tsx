export const TrustedBySection = () => {
  const technologies = [
    { name: "Laravel", style: "font-extrabold tracking-[-0.03em]" },
    { name: "React", style: "font-bold tracking-[-0.01em]" },
    { name: "Next.js", style: "font-semibold tracking-tight" },
    { name: "Flutter", style: "font-semibold tracking-tight" },
    { name: "PostgreSQL", style: "font-bold tracking-normal" },
    { name: "Docker", style: "font-semibold tracking-tight" },
    { name: "AWS", style: "font-extrabold tracking-wide" },
    { name: "Kubernetes", style: "font-semibold tracking-tight" },
  ];

  return (
    <section className="py-16 border-y border-white/[0.04] relative z-10 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-[11px] font-semibold text-gray-500 uppercase tracking-[0.25em] mb-10 reveal">
          Technologies We Build With
        </p>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...technologies, ...technologies, ...technologies].map((tech, i) => (
              <div
                key={i}
                className={`text-[1.6rem] ${tech.style} text-gray-600/40 hover:text-gray-300 transition-colors duration-500 cursor-default select-none whitespace-nowrap`}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
