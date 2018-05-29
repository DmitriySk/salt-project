let path = require('path');
let fs = require('fs');
const resolve = require('./config/webpack.resolve')(__dirname);
const cssLocalIdentName = '[name]__[local]_[hash:base64:5]';

module.exports = {
  externals: [
    (context, request, callback) => {
      const originRequest = request.split('!').pop();

      if (originRequest[0] !== '.' && originRequest[0] !== '/') {
        callback(null, `commonjs ${originRequest}`);
        return;
      }

      callback();
    }
  ],

  mode: 'development',

  target: 'node',

  resolve: resolve,

  entry: './server.ts',

  output: {
    path: __dirname,
    filename: './server.js',
    publicPath: '/public/',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.s?css$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'isomorphic-style-loader',
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
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.svg(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            mimetype: 'image/svg+xml',
            name: 'public/assets/[hash:base64:5].[ext]'
          }
        }
      },
      {
        test: /\.(png|gif|jpe?g|svg|ttf|otf|eot|woff2?)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: 'public/assets/[hash:base64:5].[ext]'
          }
        }
      }
    ]
  },

  plugins: [],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
};
