import globals from 'globals';
import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    prettierConfig,
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            parser: tsParser,
            globals: globals.browser,
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            ...jsPlugin.configs.recommended.rules,
            ...tsPlugin.configs.recommended.rules,
            'max-len': ['warn', { code: 90, ignoreUrls: true }],
            'eol-last': ['error', 'always'],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            'prettier/prettier': 'error',
        },
    },
    {
        ignores: [
            'dist/',
            'build/',
            'node_modules/',
            'coverage/',
            '*.log',
            '*.tmp',
            '.cache/',
            '.vscode/',
            '.idea/',
            '*.min.js',
            '*.bundle.js',
            '.env',
            '.env.*',
        ],
    },
];
