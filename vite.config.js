import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
export default defineConfig({
  base: "/demo/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        // key: 页面名字（打包后文件夹名字），value：html文件绝对路径
        main: path.resolve(__dirname, "index.html"),
        // contact: path.resolve(__dirname, "contact.html"),
      },
    },
  },
  ssgOptions: {
    includedRoutes(paths, routes) {
      return routes.flatMap((route) => {
        return ["vue-tutorial", "ssg-note", "pinia-demo"].map(
          (slug) => `/about/${slug}`,
        );
      });
    },
  },
});
