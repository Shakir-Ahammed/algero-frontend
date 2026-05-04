import { Briefcase, GitBranch, MessageCircle } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { PageHeader } from "../../components/sections/shared/PageHeader";
import { TEAM } from "../../features/team/team.data";

export const TeamPage = () => {
  useScrollReveal();
  return (
    <div className="pb-24 min-h-screen">
      <PageHeader
        title="Meet The Team"
        subtitle="The brilliant engineers, creative designers, and visionary leaders driving Algero forward."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl overflow-hidden group reveal"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] to-transparent"></div>
              </div>
              <div className="p-6 text-center relative -mt-10">
                <h3 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-400 text-sm font-semibold mb-6">
                  {member.role}
                </p>
                <div className="flex justify-center gap-4 border-t border-white/10 pt-4">
                  <Briefcase className="w-5 h-5 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors" />
                  <MessageCircle className="w-5 h-5 text-gray-500 hover:text-blue-400 cursor-pointer transition-colors" />
                  <GitBranch className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
