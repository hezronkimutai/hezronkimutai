import path from 'path';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webpack = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
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
    extensions: ['*', '.js', '.jsx'],
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
