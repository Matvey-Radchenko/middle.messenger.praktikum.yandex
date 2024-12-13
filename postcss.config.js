import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
/* "postcss-hexrgba": "^2.1.0",
"postcss-import": "^15.1.0",
"postcss-mixins": "^9.0.4",
"postcss-nested": "^6.0.1", */
export default {
    plugins: [/* postcssPresetEnv() */ postcssNested(), autoprefixer()],
};
