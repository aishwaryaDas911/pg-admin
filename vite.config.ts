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
        timeout: 5000, // 5 second timeout
        rewrite: (path) => path.replace(/^\/api\/auth/, '/user-role-service/userservice'),
        configure: (proxy, options) => {
          console.log('Proxying authentication requests to:', options.target);

          // Handle proxy errors
          proxy.on('error', (err, req, res) => {
            console.error('🚨 Proxy Error:', err.message);
            console.log('⚠️  External API appears to be unreachable');
            console.log('🔄 Frontend will fall back to development authentication');

            // Send a specific error response that the frontend can detect
            if (!res.headersSent) {
              res.writeHead(503, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
              });
              res.end(JSON.stringify({
                error: 'PROXY_ERROR',
                message: 'External authentication service unavailable',
                fallbackAvailable: true
              }));
            }
          });

          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('📤 Proxying request:', req.method, req.url);
          });

          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('📥 Proxy response:', proxyRes.statusCode, req.url);
          });
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
