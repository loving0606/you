const path = require('path')

module.exports = {
    lintOnSave: false,

    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                pathRewrite: {
                    '^/api': '' // 根据实际情况来自定义
                },
                changeOrigin: true
            }
        }
    }
}