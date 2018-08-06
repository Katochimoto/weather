'use strict'

const path = require('path');
const webpack = require('webpack');
const portfinder = require('portfinder')
const HtmlWebpackPlugin = require('./config/webpack/HtmlWebpackPlugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const InlineCSP = require('inline-csp-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const notifier = require('node-notifier')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const packageConfig = require('./package.json');

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');
const isDev = process.env.NODE_ENV === 'development'
const homepage = isDev ? '' : packageConfig.homepage;
const publicPath = '/';

const config = {
  mode: process.env.NODE_ENV,

  context: srcPath,

  entry: {
    main: path.join(srcPath, 'main.js'),
    inline: path.join(srcPath, 'inline.js'),
  },

  output: {
    path: distPath,
    publicPath: homepage + '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: 'chunk.[chunkhash].js',
    crossOriginLoading: 'anonymous'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
    alias: {
      '@': srcPath
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'preprocess-loader',
            options: {
              'NODE_ENV': process.env.NODE_ENV
            }
          },
          {
            loader: 'babel-loader',
          }
        ]
      },

      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: false,
              importLoaders: 1,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'fonts/'
        }
      },

      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: '[hash:8].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'img-loader'
          }
        ]
      },

      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          'svgo-loader'
        ]
      },

      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: '[name].[hash:8].[ext]',
          outputPath: 'media/'
        }
      },
    ]
  },

  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false
          }
        }
      })
    ],

    splitChunks: {
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          enforce: true,
          chunks: 'async',
          priority: 0
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all'
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
          chunks: 'async'
        }
      }
    }
  },

  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },

  plugins: [
    new CleanWebpackPlugin([ 'dist/**/*' ], { verbose: true }),
    (isDev ? null : new BundleAnalyzerPlugin({ analyzerMode: 'static' })),
    (isDev ? null : new webpack.optimize.OccurrenceOrderPlugin()),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom',
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'Weather',
      short_name: 'Weather',
      description: 'Weather forecast',
      background_color: '#9cf1fa',
      theme_color: '#9cf1fa',
      display: 'minimal-ui',
      lang: 'en-US',
      orientation: 'any',
      scope: '/weather/',
      start_url: '/weather/?utm_source=web_app_manifest',
      icons: [{
        src: path.join(srcPath, 'images', 'avatar.png'),
        sizes: [96, 128, 192, 256, 512],
        destination: 'manifest/'
      }]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(srcPath, 'images', 'avatar.png'),
      prefix: 'icons-[hash:8]/',
      persistentCache: true,
      inject: true,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        windows: false,
        yandex: false
      }
    }),
    (isDev ? null : new SWPrecacheWebpackPlugin({
      cacheId: 'rikishi-weather',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'sw.js',
      minify: !isDev,
      navigateFallback: homepage + '/index.html',
      staticFileGlobsIgnorePatterns: [
        /\.map$/,
        /\.cache$/,
        /\.webapp$/,
        /\.xml$/,
        /\.txt$/,
        /manifest.*\.json$/
      ]
    })),
    new HtmlWebpackPlugin({
      title: 'Weather',
      chunks: ['main', 'vendors', 'inline'],
      filename: 'index.html',
      template: 'main.ejs',
      inject: false,
      hash: isDev,
      cache: true,
      chunksSortMode: 'dependency',
      appMountId: 'app',
      mobile: true,
      lang: 'en-US',
      alwaysWriteToDisk: true,
      googleTag: false,
      baseHref: homepage,
      reInlineCss: /inline(\.[0-9a-z]+)?\.css$/
    }, {
      isDev: isDev
    }),
    (isDev ? new HtmlWebpackHarddiskPlugin() : null),
    // new InlineCSP({ disable: isDev }),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: !isDev
    })
  ].filter(function (item) {
    return item !== null;
  })
};

if (isDev) {
  config.devServer = {
    contentBase: distPath,
    host: 'localhost',
    port: 9000,
    publicPath: publicPath,
    proxy: {
        '/api': {
          target: 'https://api.darksky.net/forecast/1090a2dda4464c6193313225bfd03f80',
          changeOrigin: true,
          pathRewrite: {'^/api' : ''}
        }
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(publicPath, 'index.html')
        }
      ]
    },
    compress: false,
    hot: false,
    // contentBase: false, // since we use CopyWebpackPlugin.
    open: true,
    openPage: '',
    // overlay: { warnings: false, errors: true },
    // quiet: true,
    watchOptions: { poll: false }
  }
}

module.exports = new Promise((resolve, reject) => {
  if (isDev) {
    portfinder.basePort = config.devServer.port
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        // publish the new Port, necessary for e2e tests
        process.env.PORT = port
        config.devServer.port = port
        config.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${config.devServer.host}:${port}/${config.devServer.openPage}`
            ]
          },
          onErrors: (severity, errors) => {
            if (severity !== 'error') {
              return
            }

            const error = errors[0]
            const filename = error.file && error.file.split('!').pop()

            notifier.notify({
              title: packageConfig.name,
              message: severity + ': ' + error.name,
              subtitle: filename || ''
              // icon: path.join(__dirname, 'logo.png')
            })
          }
        }))

        resolve(config)
      }
    })
  } else {
    resolve(config)
  }
})
