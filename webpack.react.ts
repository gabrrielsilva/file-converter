import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';
import { Configuration } from 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/main.tsx',
  target: 'electron-renderer',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist/main.js'),
    compress: true,
    port: 5173
  } as Configuration,
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};

export default config;