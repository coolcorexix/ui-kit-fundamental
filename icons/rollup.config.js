import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";

export default defineConfig({
  input: "./src/index.ts",
  output: [
    {
      format: "umd",
      dir: "dist/umd",
      name: "nemoUI",
    },
    {
      format: "esm",
      dir: "dist/esm",
      preserveModules: true,
      exports: "named",
    },
    {
      format: "cjs",
      dir: "dist/cjs",
      exports: "named",
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json'
    }),
  ],
});
