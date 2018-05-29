let path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssLocalIdentName = '[name]__[local]_[hash:base64:5]';

module.exports = function (dirname, devMode) {
  return [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'react-hot-loader/webpack'
        },
        {
          loader: 'ts-loader'
        }
      ]
    },
    {
      test: /\.s?css$/,
      include: path.resolve(dirname, 'src'),
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2,
            localIdentName: cssLocalIdentName
          }
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'resolve-url-loader'
        },
        {
          loader: 'sass-loader?sourceMap'
        }
      ]
    },
    {
      test: /\.json$/,
      use: 'json-loader'
    },
    {
      test: /\.svg(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000,
          mimetype: 'image/svg+xml',
          name: '[hash:base64:5].[ext]'
        }
      }
    },
    {
      test: /\.(otf|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          limit: 1000,
          name: '[hash:base64:5].[ext]'
        }
      }
    },
    {
      test: /\.(png|gif|jpg|jpeg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: '[hash:base64:5].[ext]'
        }
      }
    }
  ];
};
