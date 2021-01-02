const VueFilenameInjector = require('./tools/vue-filename-injector')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// 基础路径 注意发布之前要先修改这里
const publicPath = '/{{ name }}/'
const CDN_DOMAIN = 'https://cdn.bootcss.com'
const cdn = {
  css: [
    `${CDN_DOMAIN}/element-ui/2.11.1/theme-chalk/index.css`,
    `${CDN_DOMAIN}/nprogress/0.2.0/nprogress.min.css`
  ],
  js: [
    `${CDN_DOMAIN}/vue/2.6.10/vue.min.js`,
    `${CDN_DOMAIN}/vue-router/3.0.6/vue-router.min.js`,
    `${CDN_DOMAIN}/element-ui/2.11.1/index.js`,
    `${CDN_DOMAIN}/vuex/3.1.1/vuex.min.js`,
    `${CDN_DOMAIN}/axios/0.19.0/axios.min.js`,
    `${CDN_DOMAIN}/js-cookie/2.2.0/js.cookie.min.js`,
    `${CDN_DOMAIN}/nprogress/0.2.0/nprogress.min.js`,
    `${CDN_DOMAIN}/echarts/4.3.0-rc.1/echarts.min.js`,
    `${CDN_DOMAIN}/lodash.js/4.17.15/lodash.min.js`,
    `${CDN_DOMAIN}/qs/6.8.0/qs.min.js`,
    // `${CDN_DOMAIN}/core-js/2.6.9/core.min.js`,
    // `${CDN_DOMAIN}/vue-i18n/8.14.0/vue-i18n.esm.js`,
    `${CDN_DOMAIN}/UAParser.js/0.7.20/ua-parser.min.js`
    // 'https://unpkg.com/better-scroll@1.15.2/dist/bscroll.min.js'
  ]
}
module.exports = {
  publicPath, // 根据你的实际情况更改这里
  lintOnSave: true,
  devServer: {
    publicPath // 和 publicPath 保持一致
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: '@import \'~@/assets/style/public.scss\';'
      }
    }
  },
  configureWebpack: config => {
    config.externals = {
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'js-cookie': 'Cookies',
      'nprogress': 'NProgress',
      'echarts': 'echarts',
      'lodash': '_',
      // 'vue-i18n':'vue-i18n',
      'ua-parser-js': 'UAParser',
      // 'better-scroll': 'BScroll',
      'qs': 'Qs'
      // 'core-js': 'core-js'
    }
    // 非开发环境
    if (process.env.NODE_ENV !== 'development') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }
    // const Plugins = [
    //   new MiniCssExtractPlugin({
    //     // Options similar to the same options in webpackOptions.output
    //     // both options are optional
    //     filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
    //     chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    //   })]
    //   config.plugins = [...config.plugins, ...Plugins]
  },

  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    config
      .plugin('theme-color-replacer')
      .use(ThemeColorReplacer, [{
        fileName: 'css/theme-colors.[contenthash:8].css',
        resolveCss(resultCss) { // optional. Resolve result css code as you wish.
          return resultCss.replace(/process.env.VUE_APP_ELEMENT_COLOR/g, process.env.VUE_APP_ELEMENT_COLOR)
        },
        matchColors: [
          ...forElementUI.getElementUISeries(process.env.VUE_APP_ELEMENT_COLOR) // Element-ui主色系列
        ],
        externalCssFiles: [ './node_modules/element-ui/lib/theme-chalk/index.css' ], // optional, String or string array. Set external css files (such as cdn css) to extract colors.
        changeSelector: forElementUI.changeSelector
      }])
    config
      // 开发环境
      .when(process.env.NODE_ENV === 'development',
        // sourcemap不包含列信息
        config => config.devtool('cheap-source-map')
      )
      // TRAVIS 构建 vue-loader 添加 filename
      .when(process.env.VUE_APP_BUILD_MODE === 'TRAVIS' || process.env.NODE_ENV === 'development',
        VueFilenameInjector(config, {
          propName: process.env.VUE_APP_SOURCE_VIEWER_PROP_NAME
        })
      )
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
    config.plugin('html')
      .tap(args => {
        // args[0].minify.removeComments = false;
        args[0].cdn = cdn
        return args
      })
    // if (process.env.NODE_ENV === 'development') {
    //   config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // }
    // 判断环境加入模拟数据
    // const entry = config.entry('app')
    // if (process.env.VUE_APP_BUILD_MODE !== 'nomock') {
    //   entry
    //     .add('@/mock')
    //     .end()
    // }
  },
  // i18n
  pluginOptions: {
    i18n: {
      locale: 'zh-chs',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
