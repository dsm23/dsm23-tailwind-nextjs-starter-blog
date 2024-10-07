// import next from "@next/eslint-plugin-next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import * as mdx from "eslint-plugin-mdx";
import react from "eslint-plugin-react";
// import storybook from "eslint-plugin-storybook";
import globals from "globals";
import ts from "typescript-eslint";

import tailwind from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

const compat = new FlatCompat();

const compatConfig = compat.config({
  extends: [
    // https://github.com/vercel/next.js/discussions/49337
    "plugin:@next/eslint-plugin-next/core-web-vitals",

    // https://github.com/facebook/react/issues/28313
    "plugin:react-hooks/recommended",
  ],
});

export default ts.config(
  includeIgnoreFile(gitignorePath),
  {
    files: ["**/*.{js,mjs,cjs,ts,md,mdx,jsx,tsx}"],
    languageOptions: {
      globals: globals.nodeBuiltin,
      parserOptions: {
        projectService: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
  },
  js.configs.recommended,
  // ...ts.configs.strictTypeChecked,
  // ...ts.configs.stylisticTypeChecked,
  ...ts.configs.strict,
  ...ts.configs.stylistic,
  react.configs.flat["jsx-runtime"],
  prettier,
  ...tailwind.configs["flat/recommended"],
  ...compatConfig,
  {
    files: ["**/*.{js,md,mdx,mjs,ts,tsx}"],

    rules: {
      "@next/next/no-duplicate-head": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    settings: {
      tailwindcss: {
        // These are the default values but feel free to customize
        callees: ["classnames", "clsx", "ctl"],
        config: "tailwind.config.ts", // returned from `loadConfig()` utility if not provided
        cssFiles: [
          "**/*.css",
          "!**/node_modules",
          "!**/.*",
          "!**/dist",
          "!**/build",
        ],
        cssFilesRefreshRate: 5_000,
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [],
        tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
        classRegex: "^class(Name)?$", // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
      },
    },
  },
  // {
  //   files: [
  //     "*.stories.@(ts|tsx|js|jsx|mjs|cjs)",
  //     "*.story.@(ts|tsx|js|jsx|mjs|cjs)",
  //   ],
  //   plugins: {
  //     storybook: fixupPluginRules(storybook),
  //   },
  //   rules: {
  //     "react-hooks/rules-of-hooks": "off",
  //     "import/no-anonymous-default-export": "off",
  //     "storybook/await-interactions": "error",
  //     "storybook/context-in-play-function": "error",
  //     "storybook/default-exports": "error",
  //     "storybook/hierarchy-separator": "warn",
  //     "storybook/no-redundant-story-name": "warn",
  //     "storybook/prefer-pascal-case": "warn",
  //     "storybook/story-exports": "error",
  //     "storybook/use-storybook-expect": "error",
  //     "storybook/use-storybook-testing-library": "error",
  //   },
  // },
  // {
  //   files: [".storybook/main.@(js|cjs|mjs|ts)"],
  //   plugins: {
  //     storybook: fixupPluginRules(storybook),
  //   },
  //   rules: {
  //     "storybook/no-uninstalled-addons": "error",
  //   },
  // },
  {
    files: ["!**/{app, components}/**"],
    ...ts.configs.disableTypeChecked,
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
      // "@typescript-eslint/restrict-template-expressions": [
      //   "error",
      //   {
      //     allowNumber: true,
      //     allowBoolean: true,
      //   },
      // ],
      "no-console": [
        "error",
        {
          allow: ["debug", "error", "info", "trace", "warn"],
        },
      ],
    },
  },
  {
    // Configure.mdx
    files: ["**/*.mdx"],
    rules: {
      "react/jsx-uses-vars": "error",
      "tailwindcss/no-custom-classname": "off",
    },
  },
  mdx.flat,
);