var gulp = require('gulp');
var connect = require('gulp-connect');
var replace = require('gulp-html-replace');
var includer = require('gulp-htmlincluder');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

gulp.task('clean', function(){
	gulp.src('build', {read: false})
	.pipe(clean());
});

gulp.task('copyCss', function(){
	gulp.src('dev/css/**/*.css')
	.pipe(gulp.dest('build/css'));
})

gulp.task('server', function(){
	connect.server({
		root : 'build',
		livereload: true
	});
});
gulp.task('css', function(){
	gulp.src('dev/less/general.less')
		.pipe(less())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('build/css/'))
		.pipe(connect.reload());
});

gulp.task('html', function(){
	gulp.src('dev/**/*.html')
		.pipe(includer())
		.pipe(replace({
			css: 'css/style.css'
		}))
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

gulp.task('default', function(){
	gulp.start('copyCss', 'css', 'html', 'server');

	gulp.watch(['dev/less/**/*.less'], function(){
		gulp.start('css');
	});
	gulp.watch(['dev/**/*.html'], function(){
		gulp.start('html');
	});
});