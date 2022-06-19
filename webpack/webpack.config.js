const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin')
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin')
const {pagesPath, publicFolderPath, distFolderPath} = require('./common-paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (_env,argv) => {

  let entryPoints = {
    Config:{
      path: path.resolve(pagesPath, 'config.tsx'),
      outputHtml: 'config.html',
      build:true
    },
    LiveConfig:{
      path: path.resolve(pagesPath, 'live-config.tsx'),
      outputHtml: 'live_config.html',
      build:true
    },
    VideoOverlay:{
      path: path.resolve(pagesPath, 'video-overlay.tsx'),
      outputHtml: 'video_overlay.html',
      build:true
    },
  }

  let entry = {}

  let plugins = [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new CopyPlugin({
      patterns: [
        { context: publicFolderPath, from: '**/**', to: distFolderPath, globOptions: {
          ignore: [
              '**/index.html'
          ]
      } },
      ],
    }),
    new MiniCssExtractPlugin()
  ]

  for(name in entryPoints){
    if(entryPoints[name].build){
      entry[name]=entryPoints[name].path
      
        plugins.push(new HtmlWebpackPlugin({
          inject:true,
          chunks:[name],
          template: path.resolve(publicFolderPath, 'index.html'),
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
        {
          test: /\.(css|sass|scss)/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, "..", "src", "styles", "settings", "_colors.scss"),
                  path.resolve(__dirname, "..", "src", "styles", "settings", "_fonts.scss")
                ]
              }
            },
            {
              loader: 'postcss-loader',
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss'],
      plugins: [new TsconfigPathsPlugin({configFile: path.resolve(__dirname, '..', 'tsconfig.json')})]
    },
    output: {
      filename: '[name].bundle.js',
      path: distFolderPath
    },
    plugins
  }

  if(argv.mode==='development'){
    config.devServer = {
      https: true,
      allowedHosts: "all",
      static: {
        directory: publicFolderPath
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      port: 3000
    }
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