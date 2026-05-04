import { useState, useCallback } from "react";
import { Briefcase, MessageCircle, GitBranch, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { PageHeader } from "../../components/sections/shared/PageHeader";
import { TEAM } from "../../features/team/team.data";
import { Button } from "../../components/ui/Button";

const SOCIAL_ICONS = [
  { key: "linkedin" as const, Icon: Briefcase, hoverColor: "hover:text-blue-400 hover:bg-blue-400/15" },
  { key: "twitter" as const, Icon: MessageCircle, hoverColor: "hover:text-sky-400 hover:bg-sky-400/15" },
  { key: "github" as const, Icon: GitBranch, hoverColor: "hover:text-white hover:bg-white/15" },
];

export const TeamPage = () => {
  const navigate = useNavigate();
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
  const [mobileExpandedIdx, setMobileExpandedIdx] = useState<number | null>(null);
  useScrollReveal();

  const handleMouseEnter = useCallback((idx: number) => {
    setFocusedIdx(idx);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setFocusedIdx(null);
  }, []);

  const handleMobileClick = useCallback((idx: number) => {
    setMobileExpandedIdx((prev) => (prev === idx ? null : idx));
  }, []);

  const activeMember = focusedIdx !== null ? TEAM[focusedIdx] : null;

  return (
    <div className="pb-0 min-h-screen relative">
      {/* Background decoration */}
      <div className="floating-orb top-[20%] right-[5%] w-[400px] h-[400px] bg-blue-600/8 animate-glow-pulse"></div>
      <div className="floating-orb bottom-[30%] left-[5%] w-[350px] h-[350px] bg-cyan-600/6 animate-glow-pulse animation-delay-3000"></div>

      <PageHeader
        label="Our People"
        title="Meet The Team"
        subtitle="The brilliant engineers, creative designers, and visionary leaders driving Algero forward."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== INTERACTIVE FOCUS GRID (Desktop) ===== */}
        <div
          className="hidden md:block mb-8"
          onMouseLeave={handleMouseLeave}
        >
          <div className="grid grid-cols-4 gap-6">
            {TEAM.map((member, idx) => {
              const isFocused = focusedIdx === idx;
              const isDimmed = focusedIdx !== null && !isFocused;

              return (
                <div
                  key={idx}
                  className="relative cursor-pointer reveal"
                  style={{
                    transitionDelay: `${idx * 100}ms`,
                  }}
                  onMouseEnter={() => handleMouseEnter(idx)}
                >
                  {/* Card */}
                  <div
                    className="glass-card rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: isFocused ? "scale(1.05) translateY(-8px)" : isDimmed ? "scale(0.97)" : "scale(1)",
                      opacity: isDimmed ? 0.3 : focusedIdx === null ? 0.85 : 1,
                      filter: isDimmed ? "blur(1.5px)" : "blur(0px)",
                      boxShadow: isFocused
                        ? "0 0 40px rgba(59,130,246,0.15), 0 20px 60px rgba(0,0,0,0.3)"
                        : "none",
                      borderColor: isFocused ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  >
                    {/* Image */}
                    <div className="h-72 lg:h-80 overflow-hidden relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-all duration-700"
                        style={{
                          filter: isFocused ? "grayscale(0)" : "grayscale(100%)",
                          transform: isFocused ? "scale(1.08)" : "scale(1)",
                        }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/30 to-transparent"></div>

                      {/* Glow effect on focused card */}
                      {isFocused && (
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-cyan-500/5 transition-opacity duration-500"></div>
                      )}

                      {/* Social icons — appear on focus */}
                      <div
                        className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                        style={{
                          opacity: isFocused ? 1 : 0,
                          transform: isFocused ? "translateY(0)" : "translateY(12px)",
                        }}
                      >
                        {SOCIAL_ICONS.map(({ key, Icon, hoverColor }) =>
                          member.social?.[key] ? (
                            <a
                              key={key}
                              href={member.social[key]}
                              className={`w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 transition-all duration-300 ${hoverColor}`}
                              aria-label={key}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </a>
                          ) : null,
                        )}
                      </div>
                    </div>

                    {/* Name & Role */}
                    <div className="p-5 text-center">
                      <h3
                        className="text-lg font-bold mb-1 transition-colors duration-500"
                        style={{ color: isFocused ? "rgb(96,165,250)" : "white" }}
                      >
                        {member.name}
                      </h3>
                      <p className="text-blue-400/60 text-[11px] font-semibold uppercase tracking-[0.15em]">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===== DETAILS PANEL (Desktop) ===== */}
          <div
            className="mt-6 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              maxHeight: activeMember ? "200px" : "0px",
              opacity: activeMember ? 1 : 0,
              transform: activeMember ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {activeMember && (
              <div className="glass-card rounded-2xl p-8 border border-blue-500/20 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-600/8 rounded-full filter blur-[80px] pointer-events-none"></div>

                <div className="relative z-10 flex items-center gap-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-500/30">
                    <img
                      src={activeMember.image}
                      alt={activeMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white">{activeMember.name}</h3>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.15em] bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                        {activeMember.role}
                      </span>
                    </div>
                    <p className="text-gray-400/90 text-sm leading-relaxed max-w-2xl">
                      {activeMember.bio}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {SOCIAL_ICONS.map(({ key, Icon, hoverColor }) =>
                      activeMember.social?.[key] ? (
                        <a
                          key={key}
                          href={activeMember.social[key]}
                          className={`w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-gray-500 transition-all duration-300 ${hoverColor}`}
                          aria-label={key}
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      ) : null,
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== MOBILE CARDS (Click to expand) ===== */}
        <div className="md:hidden space-y-4 mb-16">
          {TEAM.map((member, idx) => {
            const isExpanded = mobileExpandedIdx === idx;

            return (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden reveal transition-all duration-500"
                style={{
                  transitionDelay: `${idx * 80}ms`,
                  borderColor: isExpanded ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                onClick={() => handleMobileClick(idx)}
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-500"
                      style={{ filter: isExpanded ? "grayscale(0)" : "grayscale(100%)" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-base transition-colors duration-500 ${isExpanded ? "text-blue-400" : "text-white"}`}>
                      {member.name}
                    </h3>
                    <p className="text-blue-400/60 text-xs font-semibold uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center transition-transform duration-500"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-500">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Expanded content */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    maxHeight: isExpanded ? "200px" : "0px",
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-gray-400/80 text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex gap-2">
                      {SOCIAL_ICONS.map(({ key, Icon, hoverColor }) =>
                        member.social?.[key] ? (
                          <a
                            key={key}
                            href={member.social[key]}
                            className={`w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-gray-500 transition-all duration-300 ${hoverColor}`}
                            aria-label={key}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </a>
                        ) : null,
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="h-12 md:h-20"></div>
      </div>

      {/* ===== JOIN THE TEAM CTA ===== */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-[#0a1628] to-purple-600/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="floating-orb top-0 right-[20%] w-[300px] h-[300px] bg-blue-500/10"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center reveal">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
            Careers
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Join our <span className="text-gradient-animate">growing team</span>
          </h2>
          <p className="text-lg text-gray-400/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            We're always looking for talented engineers, designers, and
            strategists who want to build the future of digital products.
          </p>
          <Button
            onClick={() => navigate("/contact")}
            icon={<ArrowRight className="w-5 h-5" />}
            className="!py-4 !px-10 !text-base"
          >
            View Open Positions
          </Button>
        </div>
      </div>
    </div>
  );
};
