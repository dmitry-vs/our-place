const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env) => {
  const isProduction = env.production;
  const mode = isProduction ? 'production' : 'development';
  const output = isProduction
    ? {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].js',
        publicPath: '',
        clean: true,
      }
    : {
        publicPath: '/',
      };

  const devtool = isProduction ? undefined : 'inline-source-map';
  const devServer = isProduction
    ? undefined
    : {
        static: path.join(__dirname, 'build'),
        historyApiFallback: true,
        port: 3000,
        hot: true,
      };

  const plugins = [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ];
  if (isProduction) plugins.push(new MiniCssExtractPlugin());

  const optimization = isProduction
    ? {
        minimizer: [new CssMinimizerPlugin()],
      }
    : undefined;

  return {
    mode,
    entry: './src/index.tsx',
    output,
    devtool,
    devServer,
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
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
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: isProduction
                    ? '[local]-[hash:base64:8]'
                    : '[name]-[local]-[hash:base64:8]',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins,
    optimization,
  };
};
