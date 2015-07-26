var config = {

  output: {
    filename: 'ngFx.js',
    libraryTarget: 'umd',
    library: 'ngFx'
  },

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
  }
};

module.exports = config;
