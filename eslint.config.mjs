import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    ignores: ["node_modules", "dist"],
    rules: {
      "no-unused-vars": 'error',
      'no-unused-expressions': 'error',
      "no-undef": "error",
      "prefer-const": "error",
      '@typescript-eslint/no-require-imports': 'error',
      "no-console": "warn"  
    },
  },

];