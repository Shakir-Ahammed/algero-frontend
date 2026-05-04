export const TrustedBySection = () => (
  <section className="py-12 border-y border-white/5 relative z-10 bg-white/5 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4">
      <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8 reveal">
        Trusted by Innovative Teams Worldwide
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-700 reveal reveal-delay-1">
        {["Vercel", "Stripe", "Linear", "Notion", "Figma"].map((logo, i) => (
          <div
            key={i}
            className="text-2xl font-bold text-gray-300 tracking-tighter"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  </section>
);
