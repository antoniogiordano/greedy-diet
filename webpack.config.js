/**
 * Created by AntonioGiordano on 04/01/16.
 */

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    common: ['react', 'react-dom'],
    'home': './app/Misc/home/injector.jsx',
  },
  output: {
    path: path.join(__dirname, 'public', 'js', 'bundles'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [path.join(__dirname, 'app'), path.join(__dirname, 'views')],
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss/,
        // loaders: ["css", "sass"]
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader')
      }
    ]
  },
  exclude: [ /joi-browser/ ],
  resolve: {
    fallback: path.join(__dirname, "node_modules"),
    packageAlias: 'browser'
  },
  resolveLoader: { fallback: path.join(__dirname, "node_modules") },
  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new webpack.NormalModuleReplacementPlugin(/^(net|dns)$/, path.resolve(__dirname, 'server/shim.js'), path.resolve(__dirname, 'node_modules')),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',

      // filename: 'vendor.js'
      // (Give the chunk a different name)

      minChunks: Infinity
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    })
  ]
}
