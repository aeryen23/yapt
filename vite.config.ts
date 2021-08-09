import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import gitRevision from 'vite-plugin-git-revision';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/yapt/",
  plugins: [reactRefresh(), gitRevision({})],
  define: {
    "RELEASE_DATE": JSON.stringify(new Date().toJSON())
  }
})
