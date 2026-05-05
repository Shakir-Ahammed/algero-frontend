import { Mail, MapPin, Phone } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { PageHeader } from "../../components/sections/shared/PageHeader";
import { Button } from "../../components/ui/Button";

export const ContactPage = () => {
  useScrollReveal();
  return (
    <div className="pb-24 min-h-screen">
      <PageHeader
        title="Let's Talk"
        subtitle="Whether you have a groundbreaking idea or need to scale your existing architecture, we're here to help."
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
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start p-6 glass-card rounded-2xl hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mr-6 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg mb-1">
                    Visit our HQ
                  </p>
                  <p className="text-gray-400">
                    100 Tech Hub Square
                    <br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-3xl border-t border-blue-500/30 reveal reveal-delay-2">
            <form
              className="space-y-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
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
                  className="w-full px-5 py-4 bg-[#030712]/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-white placeholder-gray-600"
                  placeholder="Tell us about your goals, timeline, and budget..."
                ></textarea>
              </div>
              <Button className="w-full !py-4 text-lg">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
