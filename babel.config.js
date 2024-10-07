module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "./components",
            "@utils": "./utils",
            "@assets": "./assets",
            "@screens": "./screens",
            "@navigation": "./navigation",
            "@services": "./services",
          },
        },
      ],
    ],
  };
};
