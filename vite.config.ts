import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy API requests to avoid CORS issues in development
      '/api/auth': {
        target: 'http://192.168.12.7:9996',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, '/user-role-service/userservice'),
        configure: (proxy, options) => {
          console.log('Proxying authentication requests to:', options.target);
        }
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
