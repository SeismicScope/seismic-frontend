import tsPlugin from "@typescript-eslint/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundariesPlugin from "eslint-plugin-boundaries";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import storybookPlugin from "eslint-plugin-storybook";

import noManyParams from "./eslint-rules/no-many-params.js";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooksPlugin,
      storybook: storybookPlugin,
      "simple-import-sort": simpleImportSort,
      boundaries: boundariesPlugin,
      custom: {
        rules: {
          "no-many-params": noManyParams,
        },
      },
    },

    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "entities", pattern: "src/entities/**" },
        { type: "features", pattern: "src/features/**" },
        { type: "shared", pattern: "src/shared/**" },
      ],
    },

    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["pages", "widgets", "features", "entities", "shared"],
            },
            {
              from: "pages",
              allow: ["widgets", "features", "entities", "shared"],
            },
            {
              from: "widgets",
              allow: ["features", "entities", "shared"],
            },
            {
              from: "features",
              allow: ["entities", "shared"],
            },
            {
              from: "entities",
              allow: ["shared"],
            },
            {
              from: "shared",
              allow: ["shared"],
            },
          ],
        },
      ],

      "custom/no-many-params": "error",
      "boundaries/no-private": "error",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      "react-hooks/incompatible-library": "off",

      "no-console": ["warn", { allow: ["warn", "error"] }],

      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
        {
          blankLine: "always",
          prev: "import",
          next: "*",
        },
        {
          blankLine: "any",
          prev: "import",
          next: "import",
        },
      ],

      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 1,
        },
      ],

      "max-lines": [
        "warn",
        {
          max: 300,
        },
      ],

      ...reactHooksPlugin.configs.recommended.rules,
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "*.config.js",
    "*.config.ts",
    "types/routes.d.ts",
    "types/validator.ts",
    "types/cache-life.d.ts",
    "*.test.ts",
    "*.test.tsx",
    "*.test.js",
    "*.test.jsx",
    "storybook-static/**",
    "coverage/**",
  ]),
]);

export default eslintConfig;
