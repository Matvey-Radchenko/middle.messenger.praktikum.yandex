import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import path from 'path';

export default defineConfig({
    plugins: [
        handlebars({
            partialDirectory: './src/templates/partials',
        }),
    ],
    resolve: {
        alias: {
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@widgets': path.resolve(__dirname, 'src/widgets'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@entities': path.resolve(__dirname, 'src/entities'),
            '@shared': path.resolve(__dirname, 'src/shared'),
        },
    },
    css: {
        postcss: './postcss.config.js',
    },
    root: './src',
    server: {
        port: 3000,
    },
});
