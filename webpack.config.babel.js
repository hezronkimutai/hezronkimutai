import path from 'path';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webpack = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.tsx'), // Updated to .tsx
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Add TypeScript rule
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        include: path.resolve(__dirname, './src/assets'),
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(scss|sass|css)$/i,  // Added .scss and .sass support
        include: path.resolve(__dirname, './src/assets'),
        use: [
          'style-loader',  // or MiniCssExtractPlugin.loader for production
          'css-loader',    // Processes CSS
          'postcss-loader', // Processes TailwindCSS
          'sass-loader',    // Adds support for Sass
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // Add TypeScript extensions
    alias: {
      '@': path.resolve(__dirname, 'src'), // Add alias to match tsconfig
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public/'),
    },
    historyApiFallback: true,
    port: 4000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new Dotenv({
      path: './.env',
      safe: true,
    }),
  ],
};

export default webpack;
