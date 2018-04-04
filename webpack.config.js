var config = {

  output: {
    filename: 'ng-fx.js',
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
      { test: /\.js$/, loader: 'babel', exclude: [/node_modules/] },
      { test: /\.styl$/, loader: 'style!css!stylus' }
    ]
  }
};

module.exports = config;
