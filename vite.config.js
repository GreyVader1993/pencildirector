import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Only TURNSTILE_SITE_KEY is exposed to the browser. Other env vars (secrets) stay on the server.
  const env = loadEnv(mode, process.cwd(), "TURNSTILE_");
  return {
    plugins: [react()],
    define: {
      "import.meta.env.TURNSTILE_SITE_KEY": JSON.stringify(env.TURNSTILE_SITE_KEY ?? ""),
    },
  };
});
