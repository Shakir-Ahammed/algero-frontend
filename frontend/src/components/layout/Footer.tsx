import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Mail, MapPin, Phone, Check } from "lucide-react";
import { ExactLogo } from "../ui/ExactLogo";
import { apiPost } from "../../lib/api";

const LINKS = {
  company: [
    { label: "About Us", to: "/about" },
    { label: "Team", to: "/team" },
    { label: "Careers", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
  services: [
    { label: "Web Development", to: "/services" },
    { label: "Mobile Apps", to: "/services" },
    { label: "UI/UX Design", to: "/services" },
    { label: "Cloud DevOps", to: "/services" },
  ],
};

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubscribe = async () => {
    if (!email) return;
    setSubStatus("sending");
    try {
      await apiPost("/subscribe", { email });
      setSubStatus("done");
      setEmail("");
    } catch {
      setSubStatus("error");
    }
  };

  return (
  <footer className="relative bg-[#020408] border-t border-white/[0.04]">
    {/* Newsletter Banner */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
      <div className="glass-card rounded-2xl p-8 md:p-10 border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Stay ahead of the curve
          </h3>
          <p className="text-gray-400 text-sm">
            Get insights on tech, design, and product development.
          </p>
        </div>
        <div className="flex w-full md:w-auto">
          {subStatus === "done" ? (
            <div className="flex items-center gap-2 text-green-400 font-medium text-sm px-5 py-3">
              <Check className="w-5 h-5" /> Subscribed! Thank you.
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                className="bg-white/[0.06] border border-white/[0.1] rounded-l-xl px-5 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 w-full md:w-64 transition-colors"
              />
              <button
                onClick={handleSubscribe}
                disabled={subStatus === "sending"}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-r-xl font-semibold text-sm transition-colors flex items-center gap-2 btn-press whitespace-nowrap disabled:opacity-50"
              >
                {subStatus === "sending" ? "..." : "Subscribe"} <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>

    {/* Main Footer */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-2">
          <div className="mb-5">
            <Link to="/" aria-label="Algero Home">
              <ExactLogo />
            </Link>
          </div>
          <p className="text-gray-500 mb-6 max-w-xs text-sm leading-relaxed">
            Building scalable, secure, and beautiful digital products for the
            next generation of startups and enterprises.
          </p>
          <div className="space-y-3">
            <a href="mailto:hello@algero.io" className="flex items-center gap-3 text-sm text-gray-500 hover:text-blue-400 transition-colors">
              <Mail className="w-4 h-4" /> hello@algero.io
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-3 text-sm text-gray-500 hover:text-blue-400 transition-colors">
              <Phone className="w-4 h-4" /> +1 (234) 567-890
            </a>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <MapPin className="w-4 h-4" /> San Francisco, CA
            </div>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold text-white mb-6 text-sm">Company</h4>
          <ul className="space-y-3.5">
            {LINKS.company.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-white mb-6 text-sm">Services</h4>
          <ul className="space-y-3.5">
            {LINKS.services.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Status */}
        <div>
          <h4 className="font-bold text-white mb-6 text-sm">System</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-green-400 font-medium">All systems operational</span>
            </div>
            <div className="text-xs text-gray-600">99.9% uptime this month</div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
        <p>&copy; {new Date().getFullYear()} Algero Technologies Inc.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Cookies</a>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3 h-3" /> <span>EN</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};
