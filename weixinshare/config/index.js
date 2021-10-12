'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  publicPath: './',
  assetsDir: 'static',
	productionSourceMap: false,
	outputDir: 'dist/hello-teacherclient',
  dev: {
    // Paths
		open: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    https: false,
    hot: true,
    proxyTable: {
      '/api': {
        changeOrigin: true, //跨域
        target: 'http://192.168.0.135:9000',
        // target: 'https://gateway.bomaleye.com',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      },
      '/ent': {
        changeOrigin: true, //跨域
        // target: 'https://xdtxdata.com',
        target: 'https://gateway.bomaleye.com',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      },
      '/jbh': {
        changeOrigin: true, //跨域
        // target: 'https://xdtxdata.com',
        target: 'https://gateway.bomaleye.com',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      },
      '/rec': {
        changeOrigin: true, //跨域
        // target: 'https://xdtxdata.com',
        target: 'https://gateway.bomaleye.com',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      },
      '/fjr': {
        changeOrigin: true, //跨域
        // target: 'https://xdtxdata.com',
        target: 'https://gateway.bomaleye.com',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      },
      '/wecs': {
        changeOrigin: true, //跨域
        target: 'https://gateway.bomaleye.com',
        // target: 'http://192.168.0.135:9000',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      },
      '/sys': {
        changeOrigin: true, //跨域
        target: 'https://gateway.bomaleye.com',
        // target: 'http://192.168.0.13153:9088',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      },
      '/act': {
        changeOrigin: true, //跨域
        target: 'http://192.168.0.135:9000',
        // target: 'https://gateway.bomaleye.com',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      },
      '/video': {
        changeOrigin: true, //跨域
        target: 'http://192.168.0.135:9000',
        // target: 'https://gateway.bomaleye.com',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      },
      '/dct': {
        changeOrigin: true, //跨域
        target: 'http://192.168.0.135:9000',
        // target: 'http://192.168.0.13153:9088',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      },
      '/marketing': {
        changeOrigin: true, //跨域
        target: 'http://192.168.0.135:9000',
        // target: 'http://192.168.0.13153:9088',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      },
      '/pay': {
        changeOrigin: true, //跨域
        target: 'http://192.168.0.135:9000',
        // target: 'http://192.168.0.13153:9088',
        secure: false, //是否https请求,
        // pathRewrite: {
        //   '^/api': ''
        //   }
      }
    },

    // Various Dev Server settings
    host: '192.168.0.131', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**configureWebpack
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
