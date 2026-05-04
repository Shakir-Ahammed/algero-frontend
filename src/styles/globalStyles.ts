export const globalStyles = `
  /* Smooth Scrolling */
  html { scroll-behavior: smooth; }
  body { background-color: #030712; color: #f9fafb; font-family: 'Inter', system-ui, sans-serif; overflow-x: hidden; }

  /* Custom Grid Background for Hero */
  .bg-grid-pattern {
    background-size: 40px 40px;
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
  }

  /* Keyframes */
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  .animate-blob { animation: blob 10s infinite; }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-4000 { animation-delay: 4s; }

  /* Premium Glassmorphism */
  .glass-card {
    background: rgba(17, 24, 39, 0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }

  /* Glowing Borders */
  .glow-border {
    position: relative;
  }
  .glow-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #3B82F6, #06B6D4, #8B5CF6);
    z-index: -1;
    filter: blur(12px);
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: inherit;
  }
  .glow-border:hover::before { opacity: 0.7; }

  /* Gradient Text */
  .text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to right, #60A5FA, #22D3EE, #A78BFA);
  }
  .text-gradient-dark {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to right, #1E3A8A, #0284C7);
  }

  /* Scroll Reveal Animation Classes */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 100ms; }
  .reveal-delay-2 { transition-delay: 200ms; }
  .reveal-delay-3 { transition-delay: 300ms; }

  ::selection { background: #3B82F6; color: white; }
`;
