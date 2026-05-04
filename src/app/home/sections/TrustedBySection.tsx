export const TrustedBySection = () => {
  const brands = [
    { name: "Vercel", style: "font-extrabold tracking-[-0.03em]" },
    { name: "Stripe", style: "font-bold tracking-[-0.01em] italic" },
    { name: "Linear", style: "font-semibold tracking-tight" },
    { name: "Notion", style: "font-semibold tracking-tight" },
    { name: "Figma", style: "font-bold tracking-normal" },
    { name: "Supabase", style: "font-semibold tracking-tight" },
  ];

  return (
    <section className="py-16 border-y border-white/[0.04] relative z-10 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-[11px] font-semibold text-gray-500 uppercase tracking-[0.25em] mb-10 reveal">
          Trusted by Innovative Teams Worldwide
        </p>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...brands, ...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className={`text-[1.6rem] ${brand.style} text-gray-600/40 hover:text-gray-300 transition-colors duration-500 cursor-default select-none whitespace-nowrap`}
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
