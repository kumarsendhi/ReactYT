import path from 'path'
import webpack from 'webpack';
module.exports = {
  devtools: 'eval-source-map',
  entry:[
    'webpack-hot-middleware/client',
    path.join(__dirname,'/client/index.js'),
  ],
  plugins:[
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path:'/',
    publicPath:'/'
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
