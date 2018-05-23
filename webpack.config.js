const webpack = require('webpack');
const path = require('path');
const colors = require('colors');
const rimraf = require('rimraf');

module.exports = {
  context: path.resolve(__dirname, './src'),
  cache: true, entry: {
    main: './Pages/App'
  },
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: path.sep,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name]_[id]_[hash].js'
  },
  resolve: {
    alias: {
      _page: path.resolve(__dirname, './src/Pages'),
    },
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
      }
    ]
  },
  plugins: [
    {
      apply: function (compiler) {
        rimraf.sync(path.resolve(__dirname, './public/js'));
        //rimraf.sync(path.resolve(__dirname, "./public/wcss"));
        //rimraf.sync(path.resolve(__dirname, "./public/img/builded"));
      }
    },
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    }),
    new webpack.optimize.CommonsChunkPlugin('js/common.js'),
    new webpack.ProgressPlugin(function handler(percentage, msg) {
      const msgArr = msg.split(' ');
      let allChanks = -1;
      let curChank = -1;

      if (msgArr[0].indexOf('/') !== -1) {
        curChank = parseInt(msgArr[0].split('/')[0]);
        allChanks = parseInt(msgArr[0].split('/')[1]);

        process.stdout.write('\r\x1b[K');

        const count = 25;
        let hashes = '';
        const c = allChanks / count;
        for (let i = 0; i < count; ++i) {
          hashes += curChank > i * c ? '#' : ' ';
        }

        process.stdout.write(
          colors.red('progress:')
          + colors.green(' [' + hashes + '] ')
          + colors.blue(msg)
        );
      }
    })
  ]
};