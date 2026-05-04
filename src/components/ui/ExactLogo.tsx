export const ExactLogo = () => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <svg
      viewBox="0 0 100 100"
      className="w-10 h-10 transition-transform duration-500 group-hover:rotate-[360deg]"
    >
      <defs>
        <linearGradient id="grad-grey" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A929A" />
          <stop offset="100%" stopColor="#4A5568" />
        </linearGradient>
        <linearGradient id="grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <path
        d="M42,50 Q40,25 58,22 L65,35 Q52,38 48,50 Z"
        fill="url(#grad-grey)"
        className="drop-shadow-sm"
      />
      <path
        d="M25,82 Q25,60 58,35 Q45,55 35,82 Z"
        fill="url(#grad-light)"
        className="drop-shadow-sm"
      />
      <path
        d="M62,35 L75,82 Q55,75 48,60 Z"
        fill="url(#grad-dark)"
        className="drop-shadow-md"
      />
    </svg>
    <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300">
      Algero
    </span>
  </div>
);
