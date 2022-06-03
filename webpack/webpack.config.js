const path = require("path")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {TsconfigPathsPlugin} = require("tsconfig-paths-webpack-plugin")
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin")
const {sourceAppPath, publicFolderPath, distFolderPath} = require('./paths')


module.exports = (_env,argv) => {

  let entryPoints = {
    Config:{
      path: path.resolve(sourceAppPath, "config.tsx"),
      outputHtml: "config.html",
      build:true
    },
    LiveConfig:{
      path: path.resolve(sourceAppPath, "live-config.tsx"),
      outputHtml: "live_config.html",
      build:true
    },
    VideoOverlay:{
      path: path.resolve(sourceAppPath, "video-overlay.tsx"),
      outputHtml: "video_overlay.html",
      build:true
    },
  }

  let entry = {}

  let plugins = [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new CopyPlugin({
      patterns: [
        { context: publicFolderPath, from: "**/*.png", to: distFolderPath },
      ],
    }),
  ]

  for(name in entryPoints){
    if(entryPoints[name].build){
      entry[name]=entryPoints[name].path
      
        plugins.push(new HtmlWebpackPlugin({
          inject:true,
          chunks:[name],
          template: path.resolve(publicFolderPath, "index.html"),
          filename: entryPoints[name].outputHtml
        }))
      
    }    
  }

  /** @type { import('webpack').Configuration } */
  let config={
    entry,
    optimization: {
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      plugins: [new TsconfigPathsPlugin({configFile: path.resolve(__dirname, "..", "tsconfig.json")})]
    },
    output: {
      filename: "[name].bundle.js",
      path: distFolderPath
    },
    plugins
  }

  if(argv.mode==='development'){
    config.devServer = {
      host:argv.devrig ? 'localhost.rig.twitch.tv' : 'localhost',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      port: 3000
    }
    config.devServer.https = true
  }
  
  if(argv.mode === 'production') {
    config.optimization.splitChunks={
      cacheGroups:{
        default:false,
        vendors:false,
        vendor:{
          chunks:'all',
          test:/node_modules/,
          name:false
        }
      },
      name:false
    }
  }
   
  return config;
}