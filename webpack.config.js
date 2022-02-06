/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const config = {
  // use a "multi-main entry" to inject multiple dependent files together
  // and graph their dependencies into one "chunk"
  entry: {
    // app: './src/app/index.js',
    app: './src/app/index.tsx',
    background: './src/extension/background.js',
    content: './src/extension/contentScript.ts',
    backend: './src/backend/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'src/extension/build/bundles'),
    filename: '[name].bundle.js',
  },
  node: {
    net: 'empty',
    tls: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                  corejs: 3,
                  debug: true,
                },
              ],

              '@babel/preset-react',
              {
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                ],
              },
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        resolve: {
          extensions: ['.tsx', '.ts', '.js'],
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'production',
};

module.exports = config;
