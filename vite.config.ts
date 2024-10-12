import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";

const MODE = process.env.NODE_ENV || "production";

dotenv.config({
  path: path.join(path.resolve(), ".env"),
});
dotenv.config({
  path: path.join(path.resolve(), `.env.${MODE}`),
});

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.

  const env = loadEnv(mode, process.cwd(), "");

  const HOST = process.env.HOST;
  const PORT = +(process.env.PORT || 5000);

  const P_VERSION = process.env.VERSION;
  const VERSION = P_VERSION ?? pkg.version;
  const AUTHOR = pkg.author;
  const BRAND_NAME = pkg.name;

  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      "process.env": {
        MODE,
        HOST,
        PORT,
        VERSION,
        AUTHOR,
        BRAND_NAME,
      },
    },
    server: {
      host: HOST,
      port: PORT,
    },
    plugins: [react(), tsconfigPaths()],
  };
});
