import path from 'path'
module.exports = {
  devtools: 'eval-source-map',
  entry:path.join(__dirname,'/client/index.js'),
  output: {
    path:'/'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
