/**
 * @type {import('rollup').RollupOptions}
 */

// import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from 'rollup-plugin-typescript2';

export default {
  input: "./src/index.ts",
  output: [
    {
      format: "umd",
      dir: "dist/umd",
      name: "nemoUI",
    }
  ],
  plugins: [typescript()]
};
