const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, { mode }) => {
  const publicPath = mode === 'production' ? '/hacker-news/dist' : '/';

  return {
    context: path.resolve('src'),
    devServer: {
      compress: true,
      contentBase: path.resolve(__dirname, 'dist'),
      historyApiFallback: true,
    },
    entry: 'index.jsx',
    module: {
      rules: [
        {
          exclude: [/node_modules/],
          include: path.resolve('src'),
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    output: {
      filename: 'bundle.js',
      publicPath,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
      }),
      new HtmlWebpackPlugin({
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
        template: path.resolve(__dirname, 'public/index.html'),
        title: 'hacker-news',
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.resolve('src'), 'node_modules'],
    },
  };
};
