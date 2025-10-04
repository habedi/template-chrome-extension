import globals from "globals";
import js from "@eslint/js";

export default [
    // This applies the default recommended rules.
    js.configs.recommended,

    // This is your custom configuration.
    {
        files: ["src/**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser // This enables browser-specific global variables.
            }
        },
        rules: {
            // You can add your custom rules here.
        }
    }
];
