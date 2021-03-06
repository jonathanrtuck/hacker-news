module.exports = {
  plugins: ['@babel/plugin-proposal-object-rest-spread'],
  presets: [
    [
      '@babel/env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ],
};
