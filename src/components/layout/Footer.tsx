import { Briefcase, GitBranch, Globe, MessageCircle } from "lucide-react";
import { ExactLogo } from "../ui/ExactLogo";

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => (
  <footer className="bg-[#030712] border-t border-white/5 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2 lg:col-span-2">
          <div className="mb-6">
            <ExactLogo />
          </div>
          <p className="text-gray-500 mb-8 max-w-sm text-sm leading-relaxed">
            Building scalable, secure, and beautiful digital products for the
            next generation of startups and enterprises.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all"
            >
              <Briefcase className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all"
            >
              <GitBranch className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6">Company</h4>
          <ul className="space-y-4">
            {"About Us,Team,Careers,Contact".split(",").map((item) => (
              <li key={item}>
                <button
                  onClick={() =>
                    onNavigate(
                      item === "About Us" ? "about" : item.toLowerCase(),
                    )
                  }
                  className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6">Services</h4>
          <ul className="space-y-4">
            {"Web Development,Mobile Apps,UI/UX Design,Cloud DevOps,Cyber Security"
              .split(",")
              .map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate("services")}
                    className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6">Legal</h4>
          <ul className="space-y-4">
            {"Privacy Policy,Terms of Service,Cookie Policy"
              .split(",")
              .map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4">
        <p>
          &copy; {new Date().getFullYear()} Algero Technologies Inc. All rights
          reserved.
        </p>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" /> <span>San Francisco, CA</span>
        </div>
      </div>
    </div>
  </footer>
);
