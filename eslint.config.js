import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'max-len': ['warn', { code: 90, ignoreUrls: true }],
            'eol-last': ['error', 'always'],
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
];
