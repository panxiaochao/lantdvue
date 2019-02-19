module.exports = {
  //从 Vue CLI 3.3 起已弃用，请使用publicPath
  //baseUrl:'',
  publicPath: process.env.NODE_ENV === 'production' ?
    '/vue3/' : '/',

  outputDir: 'dist',

  assetsDir: 'static',

  indexPath: 'index.html',

  //生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,

  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,

  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],

  // 生产环境 sourceMap
  productionSourceMap: false,

  // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // corsUseCredentials: false,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  //这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: {

  },

  // webpack 链接 API，用于生成和修改 webapck 配置
  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: (config) => {

  },

  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // 是否开启支持 foo.module.css 样式
    modules: false,

    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    extract: process.env.NODE_ENV === 'production' ? false : true,

    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,

    // css预设器配置项
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },

      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  },

  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    open: false,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null,
    before: app => {},
    overlay: {
      warnings: true,
      errors: true
    }
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // 第三方插件配置
  pluginOptions: {}
};