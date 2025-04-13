import path from 'path';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webpackConfig = {
  mode: 'development',

  entry: path.resolve(__dirname, 'src/index.tsx'),

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      // Handle TypeScript and JavaScript files
      {
        test: /\.(ts|tsx|js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },

      // Handle image files
      {
        test: /\.(png|jpe?g|gif)$/i,
        include: path.resolve(__dirname, 'src/assets'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },

      // Handle CSS Modules (.module.scss / .module.sass)
      {
        test: /\.module\.(scss|sass)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },

      // Handle global SCSS/SASS (not CSS Modules)
      {
        test: /\.(scss|sass)$/i,
        exclude: /\.module\.(scss|sass)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      // Handle plain CSS files
      {
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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public/'),
    },
    historyApiFallback: true,
    port: 4000,
    open: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css',
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

export default webpackConfig;
