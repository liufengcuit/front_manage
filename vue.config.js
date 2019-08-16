const CompressionPlugin = require('compression-webpack-plugin');
const path = require("path");

module.exports = {
    // 基本路径
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? '/share/'
    //     : '/',
    publicPath: "/",
    // 输出文件目录
    outputDir: 'dist',
    assetsDir: 'static',
    // webpack-dev-server 相关配置
    // productionGzip: true,
    // productionGzipExtensions: ['js', 'css'],
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // proxy: {
        //     '/api': {
        //         target: 'https://dev.api.xksquare.com',
        //         changeOrigin: true
        //     },
        //     '/index': {
        //         target: 'http://zb.test.xksquare.com',
        //         changeOrigin: true
        //     }
        // }, // 设置代理
        before: app => {
        }
    },
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    //将接收ChainableConfig由webpack-chain提供支持的实例的函数。允许对内部webpack配置进行更细粒度的修改
    chainWebpack: (config) => {
        config.resolve.alias
            .set('assets', path.join(__dirname, 'src/assets'))
            .set('components', path.join(__dirname, 'src/components'))

        // 移除 prefetch preload 插件
        config.plugins.delete('prefetch-app').delete('preload-app');
    },

    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                externals: {
                    vue: "Vue",
                    vuex: "Vuex",
                    'element-ui': 'ELEMENT',
                    'axios': 'axios',
                    "vue-router": "VueRouter"
                },
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/,
                        threshold: 10240,
                        deleteOriginalAssets: false
                    }),
                ]
            }
        }
    }
    ,
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css:
        {
            // 是否使用css分离插件 ExtractTextPlugin
            extract: true,
            // 开启 CSS source maps?
            sourceMap:
                false,
            // css预设器配置项
            loaderOptions:
                {
                    
                }
            ,
            // 启用 CSS modules for all css / pre-processor files.
            modules: false
        }
    ,
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa:
        {}
    ,
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}
