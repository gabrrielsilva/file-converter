import path from 'node:path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  // Build Mode
  mode: 'development',
  // Electron Entrypoint
  entry: './src/lib/electron/main.ts',
  target: 'electron-main',
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [{
      test: /\.ts$/,
      include: /src/,
      use: [{ loader: 'ts-loader' }]
    }]
  },
  output: {
    path: __dirname + '/dist/lib/electron',
    filename: 'main.js'
  }
}

export default config;