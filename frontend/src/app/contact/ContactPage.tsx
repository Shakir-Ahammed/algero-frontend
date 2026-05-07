import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useRecaptcha } from "../../hooks/useRecaptcha";
import { PageHeader } from "../../components/sections/shared/PageHeader";
import { Button } from "../../components/ui/Button";
import { apiPost } from "../../lib/api";
import { useSeo } from "../../hooks/useSeo";

export const ContactPage = () => {
  useScrollReveal();
  useSeo({
    title: "Contact Algero — Get a Free Software Development Estimate",
    description: "Contact Algero for custom software development, mobile apps, or DevOps consulting. Based in Rajshahi, Bangladesh — serving clients globally.",
  });

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { executeRecaptcha, siteKey } = useRecaptcha();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      // Get reCAPTCHA v3 token (invisible, no user interaction)
      const recaptchaToken = await executeRecaptcha("contact");

      await apiPost("/contact", {
        ...form,
        ...(recaptchaToken ? { recaptcha_token: recaptchaToken } : {}),
      } as Record<string, unknown>);
      setStatus("sent");
      setForm({ first_name: "", last_name: "", email: "", message: "" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unable to connect. Please try again later.");
      setStatus("error");
    }
  };


  return (
    <div className="pb-24 min-h-screen">
      <PageHeader
        title="Let's Build Something Together"
        subtitle="Tell us about your project and we'll get back to you within 24 hours with a free estimate. Based in Rajshahi, Bangladesh — serving clients globally."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="reveal">
            <h3 className="text-3xl font-bold text-white mb-8">Get in touch</h3>
            <p className="text-gray-400 mb-12 text-lg">
              Fill out the form and our team will get back to you within 24
              hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start p-6 glass-card rounded-2xl hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mr-6 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg mb-1">
                    Email us
                  </p>
                  <p className="text-gray-400">hello@algero.dev</p>
                </div>
              </div>
              <div className="flex items-start p-6 glass-card rounded-2xl hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mr-6 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg mb-1">
                    Call us
                  </p>
                  <p className="text-gray-400">+880 1XXX-XXXXXX</p>
                </div>
              </div>
              <div className="flex items-start p-6 glass-card rounded-2xl hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mr-6 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg mb-1">
                    Our Office
                  </p>
                  <p className="text-gray-400">
                    Rajshahi 6000
                    <br />
                    Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-3xl border-t border-blue-500/30 reveal reveal-delay-2">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-3xl mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-gray-400 text-lg mb-8">
                  Thank you! We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {errorMsg && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {errorMsg}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-[#030712]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-600"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-[#030712]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-600"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-[#030712]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-600"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-[#030712]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-white placeholder-gray-600"
                    placeholder="Tell us about your goals, timeline, and budget..."
                  ></textarea>
                </div>
                <Button
                  className="w-full !py-4 text-lg"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
