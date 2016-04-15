'use strict'

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var plugins = [
	new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin('style.css', {
        allChunks: true,
        disable: false
    }),
    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
      $: 'webpack-zepto'
    })
];

var publicPath = '/build/';
module.exports = {
    debug: true,
    //入口文件配置
    entry: ['./src/js/main'],
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
    		test:/\.css$/,
    		loader: ExtractTextPlugin.extract(
                'style-loader', 'css-loader!sourceMap!cssnext-loader')
    	}, {
    		test: /\.js/,
    		exclude: /node_modules/,
    		loader: 'babel'
    	}, {
    		test: /\.(jpg|png|gif)$/,
    		loader: 'file-loader?name=images/[hash].[ext]'
    	}, {
    		test: /\.json$/,
    		loader: 'json'
    	}]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve:{
        extentions:['','js']//当requrie的模块找不到时，添加这些后缀
    },
    plugins: plugins,
}