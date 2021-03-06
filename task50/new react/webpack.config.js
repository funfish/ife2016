'use strict'

var webpack = require('webpack');

var publicPath = '/build/';
module.exports = {
    debug: true,
    //入口文件配置
    entry: {
        index: ['./index'],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-redux',
            'redux',
            'react-router-redux'
        ]
    },
    //文件导出的配置
    //web-dev-server里面的前后端联调，使用url绝对地址
    output: {
        path:  __dirname + publicPath,
        filename:'app.js',
        publicPath: publicPath,
        chunkFilename:'[id].build.js?[chunkhash]'
    },
    module: {
    	loaders: [{
            test: /\.css?$/,
            loader: 'style!css!sass?sourceMap',
            include: __dirname
      },{
            test: /\.scss?$/,
            loaders: [ 
            'style',
            'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'sass?sourceMap'
            ],
            include: __dirname
      },{
            test: /\.js$/,
            loaders: [ 'babel' ],
            exclude: /node_modules/,
            include: __dirname
        }]
    },
    babel: {
        presets: ['es2015', 'react']
    },
    resolve:{
        extentions:['','js']//当requrie的模块找不到时，添加这些后缀
    },
    plugins: [  
        new webpack.optimize.CommonsChunkPlugin({
            name:"vendor",
            filename:"common.js",
            minChunks: Infinity,
        })
    ],
}