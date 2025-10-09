const postcssPresetEnv = require("postcss-preset-env"); // v10.1.3

module.exports = {
    plugins: [
        postcssPresetEnv({
            browsers: ["> 0.2% and not dead"],
        }),
    ],
};
