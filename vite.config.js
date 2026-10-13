import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from 'module';


export default defineConfig({
  plugins: [react()],
  base: "./",
}); 
