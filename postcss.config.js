const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { prependListener } = require("process");

module.exports = {
  plugins: [
    autoprefixer,
    cssnano({
      preset: "default",
    }),
  ],
};
