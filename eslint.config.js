import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    // Ignore test files from linting
    { ignores: ["src/**/*.test.{js,ts}"] },

    // Apply default JS recommended rules.
    js.configs.recommended,

    // Apply TypeScript recommended rules.
    ...tseslint.configs.recommended,

    // Custom configuration for TypeScript source files.
    {
        files: ["src/**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser
            }
        },
        rules: {
            // Add custom TypeScript-specific rules here as needed.
        }
    },

    // Custom configuration for JavaScript source files.
    {
        files: ["src/**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser
            }
        },
        rules: {
            // You can add your custom JS rules here.
        }
    }
];
