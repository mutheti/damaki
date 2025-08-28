// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/MYPROJECTS/damaki/node_modules/vite/dist/node/index.js";
import react from "file:///D:/MYPROJECTS/damaki/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///D:/MYPROJECTS/damaki/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "D:\\MYPROJECTS\\damaki";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isDev = mode === "development";
  const config = {
    define: {
      // Expose environment variables to your client-side code
      "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
      "import.meta.env.VITE_APP_ENV": JSON.stringify(env.VITE_APP_ENV)
    },
    server: {
      host: "::",
      port: 8080,
      proxy: {
        // Proxy API requests to avoid CORS issues
        "/api": {
          target: env.VITE_API_URL || "http://localhost:8080",
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    },
    plugins: [
      react(),
      isDev && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
  return config;
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNWVBST0pFQ1RTXFxcXGRhbWFraVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcTVlQUk9KRUNUU1xcXFxkYW1ha2lcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L01ZUFJPSkVDVFMvZGFtYWtpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIC8vIExvYWQgZW52aXJvbm1lbnQgdmFyaWFibGVzIGJhc2VkIG9uIHRoZSBjdXJyZW50IG1vZGVcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XG4gIGNvbnN0IGlzRGV2ID0gbW9kZSA9PT0gJ2RldmVsb3BtZW50JztcblxuICBjb25zdCBjb25maWcgPSB7XG4gICAgZGVmaW5lOiB7XG4gICAgICAvLyBFeHBvc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzIHRvIHlvdXIgY2xpZW50LXNpZGUgY29kZVxuICAgICAgJ2ltcG9ydC5tZXRhLmVudi5WSVRFX0FQSV9VUkwnOiBKU09OLnN0cmluZ2lmeShlbnYuVklURV9BUElfVVJMKSxcbiAgICAgICdpbXBvcnQubWV0YS5lbnYuVklURV9BUFBfRU5WJzogSlNPTi5zdHJpbmdpZnkoZW52LlZJVEVfQVBQX0VOViksXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6IFwiOjpcIixcbiAgICAgIHBvcnQ6IDgwODAsXG4gICAgICBwcm94eToge1xuICAgICAgICAvLyBQcm94eSBBUEkgcmVxdWVzdHMgdG8gYXZvaWQgQ09SUyBpc3N1ZXNcbiAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9BUElfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjgwODAnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aDogc3RyaW5nKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIGlzRGV2ICYmIGNvbXBvbmVudFRhZ2dlcigpXG4gICAgXS5maWx0ZXIoQm9vbGVhbikgYXMgYW55W10sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIilcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGNvbmZpZztcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvUCxTQUFTLGNBQWMsZUFBZTtBQUMxUixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBSGhDLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRXhDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxRQUFNLFFBQVEsU0FBUztBQUV2QixRQUFNLFNBQVM7QUFBQSxJQUNiLFFBQVE7QUFBQTtBQUFBLE1BRU4sZ0NBQWdDLEtBQUssVUFBVSxJQUFJLFlBQVk7QUFBQSxNQUMvRCxnQ0FBZ0MsS0FBSyxVQUFVLElBQUksWUFBWTtBQUFBLElBQ2pFO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUE7QUFBQSxRQUVMLFFBQVE7QUFBQSxVQUNOLFFBQVEsSUFBSSxnQkFBZ0I7QUFBQSxVQUM1QixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUNBLFVBQWlCQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsUUFDdEQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUyxnQkFBZ0I7QUFBQSxJQUMzQixFQUFFLE9BQU8sT0FBTztBQUFBLElBQ2hCLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNULENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
