const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@rong/generator"]);

module.exports = withPlugins([withTM()], {
  webpack: (config) => {
    // custom webpack config
    return config;
  },
  images: {},
});