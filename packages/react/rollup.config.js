import typescript from "typescript";
const nodeResolve = require("rollup-plugin-node-resolve");
const typescriptPlugin = require("@rollup/plugin-typescript");

const extensions = [".ts", ".tsx"];

// treat as externals not relative and not absolute paths
const external = (id) => !id.startsWith(".") && !id.startsWith("/");

export default [
  {
    external,
    input: `src/index.tsx`,
    output: {
      file: `build/index.esm.js`,
      format: "esm",
      exports: "auto",
    },
    plugins: [
      typescriptPlugin({
        tsconfig: "./tsconfig.declaration.json",
      }),
    ],
  },
  {
    external,
    input: `src/index.tsx`,
    output: {
      file: `build/index.js`,
      format: "cjs",
      exports: "auto",
    },
    plugins: [
      nodeResolve({ extensions }),
      typescriptPlugin({ tsconfig: "./tsconfig.declaration.json" }),
    ],
  },
];
