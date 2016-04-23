'use strict'

var gulp = require('gulp');

var minifycss = require('gulp-clean-css'),
	webpack = require('webpack'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	webpackCon = require('./webpack.config');

/** 
 *  清理build文件
 */
gulp.task('clean', function() {
    gulp.src('./build/', {read: true}).pipe(clean())
})

/** 
 *  压缩js文件
 */
gulp.task('scripts', function() {
	gulp.src('./build/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build'))
});

/** 
 *  压缩css文件
 */
gulp.task('style',function() {
    gulp.src('./build/style.css')
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss({compatibility: 'ie8'}))
    .pipe(gulp.dest('build'));
});

/** 
 *  执行webpack打包
 */
gulp.task('webpack',['clean'], function(cb) {
    webpack(webpackCon, cb);
});

/** 
 *  默认运行
 */
gulp.task('default', ['webpack'], function() {
	gulp.run('style', 'scripts');
});