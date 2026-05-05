#!/bin/sh
# ─────────────────────────────────────────────────────────
# Runtime env injection for the SPA.
# Runs on container start, BEFORE nginx serves the app.
# Generates /usr/share/nginx/html/env-config.js from
# environment variables so the frontend can read them
# at runtime instead of relying on build-time baking.
# ─────────────────────────────────────────────────────────

CONFIG_FILE=/usr/share/nginx/html/env-config.js

cat <<EOF > "$CONFIG_FILE"
window.__ENV__ = {
  VITE_API_URL: "${VITE_API_URL:-http://localhost:8000}",
};
EOF

echo "✓ Runtime config written to $CONFIG_FILE"

# Start nginx
exec nginx -g "daemon off;"
