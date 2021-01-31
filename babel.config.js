module.exports = function babelConfig(api) {
  api.cache(() => process.env.NODE_ENV);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            ie: 11,
          },
        },
      ],
    ],
    plugins: [],
    env: {
      test: {
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
        ],
      },
    },
  };
};
