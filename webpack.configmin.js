var webpack = require('webpack');

var minifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

var config = {

  output: {
    filename: 'ng-fx.min.js',
    libraryTarget: 'umd',
    library: 'ngFx'
  },

  devtool: 'soucemap',
  externals: {
    angular: {
      root: 'angular',
      commonjs2: 'angular',
      commonjs: 'angular',
      amd: 'angular'
    }
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?stage=1', exclude: [/node_modules/] },
      { test: /\.styl$/, loader: 'style!css!stylus' }
    ]
  },

  plugins: [minifyPlugin]
};

module.exports = config;
