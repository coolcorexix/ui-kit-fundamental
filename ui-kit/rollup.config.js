import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import ttypescript from "ttypescript";
import externalPeerDeps from "rollup-plugin-peer-deps-external";

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
    externalPeerDeps(),
    typescript({
      typescript: ttypescript,
      tsconfig: "./tsconfig.build.json",
    }),
  ],
});
