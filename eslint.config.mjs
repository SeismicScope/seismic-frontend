import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import storybookPlugin from "eslint-plugin-storybook";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  
  {
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooksPlugin,
      "storybook": storybookPlugin,
      "simple-import-sort": simpleImportSort,
    },
    
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      
      "padding-line-between-statements": [
        "error",
        {
          "blankLine": "always",
          "prev": "*",
          "next": "return"
        },
        {
          "blankLine": "always",
          "prev": "import",
          "next": "*"
        },
        {
          "blankLine": "any",
          "prev": "import",
          "next": "import"
        }
      ],
      
      "no-multiple-empty-lines": [
        "error",
        {
          "max": 1,
          "maxBOF": 0,
          "maxEOF": 1
        }
      ],
      
      "max-lines": [
        "warn",
        {
          "max": 300
        }
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
  ]),
]);

export default eslintConfig;