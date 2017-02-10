'use strict';
const gulp = require('gulp');
const browserify = require('gulp-browserify');
const stringify = require('stringify');
const jison = require('gulp-jison');

gulp.task('build-ui', () => {
    gulp.src([ './ui/app.js' ])
        .pipe(browserify({
            transform: stringify({
                appliesTo: { includeExtensions: [ '.html' ] }
            })
        }))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('compile-url-parser', () => {
    gulp.src('./lib/urlParser/urlParserCommon.jison')
        .pipe(jison({ moduleType: 'commonjs' }))
        .pipe(gulp.dest('./lib/urlParser/'));
});

gulp.task('watch', () => {
    let pathsToWatch = [
        'global/**/*.*',
        'lib/**/*.js',
        'ui/**/*.*'
    ];
    gulp.watch(pathsToWatch, [ 'build-ui' ]);
});