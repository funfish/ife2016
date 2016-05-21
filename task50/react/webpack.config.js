'use strict'

var webpack = require('webpack');


var plugins = [
	new webpack.optimize.CommonsChunkPlugin('common.js'),
];

var publicPath = '/build/';
module.exports = {
    debug: true,
    //入口文件配置
    entry: ['./index'],
    //文件导出的配置
    //web-dev-server里面的前后端联调，使用url绝对地址
    output:{
        path:  __dirname + publicPath,
        filename:'app.js',
        publicPath: publicPath,
        chunkFilename:'[id].build.js?[chunkhash]'
    },
    module: {
    	loaders: [{
            test: /\.css?$/,
            loaders: [ 'style', 'raw' ],
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
    plugins: plugins,
}