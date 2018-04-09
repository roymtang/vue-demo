'use strict'

const path = require('path')

module.exports = {
    dev: {
        // 静态资源文件夹
        assetsSubDirectory: 'static',
        //发布路径
        assetsPublicPath: '/',
        // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
        // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
        // 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
        proxyTable: {},
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        //自动打开浏览器
        autoOpenBrowser: true,
        // 在浏览器是否展示错误蒙层
        errorOverlay: true,
        // 是否展示错误通知
        notifyOnErrors: true,
        // 这个是webpack-dev-servr的watchOptions的一个选项，指定webpack检查文件的方式
        // 因为webpack使用文件系统去获取文件改变的通知。在有些情况下，这个可能不起作用。例如，当使用NFC的时候，
        // vagrant也会在这方面存在很多问题，在这些情况下，使用poll选项（以轮询的方式去检查文件是否改变）可以设定为true
        // 或者具体的数值，指定文件查询的具体周期。
        poll: false,
        // 是否使用eslint loader去检查代码
        useEslint: true,
        // 如果设置为true，在浏览器中，eslint的错误和警告会以蒙层的方式展现
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // source maps的格式
        devtool: 'cheap-module-eval-source-map',
        // 指定是否通过在文件名称后面添加一个查询字符串来创建source map的缓存
        cacheBusting: true,
        // 关闭css的source map
        cssSourceMap: true
    },

    build: {
        // index.html文件的生成地方
        index: path.resolve(__dirname, '../dist/index.html'),
        // 编译生成的文件目录
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 编译生成的静态文件目录
        assetsSubDirectory: 'static',
        // 编译发布的根目录，可配置为资源服务器域名或者cdn域名
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // 是否开启生产环境的gzip压缩
        productionGzip: false,
        // 开启gzip压缩的文件的后缀名称，
        productionGzipExtensions: ['js', 'css'],

        // 如果这个选项是true的话，那么则会在build后，会在浏览器中生成一份bundler报告
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
