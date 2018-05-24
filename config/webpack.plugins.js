const webpack = require('webpack');
const colors = require('colors');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports.COMMON = [
  new ManifestPlugin({
    fileName: 'manifest.json'
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
  new webpack.ProgressPlugin(function handler(percentage, msg) {
    let msgArr = msg.split(' '), allChanks = -1, curChank = -1;

    if (msgArr[0].indexOf('/') !== -1) {
      curChank = parseInt(msgArr[0].split('/')[0]);
      allChanks = parseInt(msgArr[0].split('/')[1]);

      process.stdout.write('\r\x1b[K');

      let count = 25, hashes = '';
      let c = allChanks / count;
      for (let i = 0; i < count; ++i) {
        hashes += curChank > i * c ? '#' : ' ';
      }

      process.stdout.write(
        colors.red('progress:')
        + colors.green(' [' + hashes + '] ')
        + colors.blue(msg)
      );
    }
  }),
];

module.exports.DEV = [
  new webpack.DefinePlugin({
    'process.env.BROWSER': JSON.stringify(true),
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.HotModuleReplacementPlugin(),
];

module.exports.PROD = [
  new webpack.DefinePlugin({
    'process.env.BROWSER': JSON.stringify(true),
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.html$|\.css$/,
    threshold: 10240,
    minRatio: 0.8
  })
];