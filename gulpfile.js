'use strict';
const gulp = require('gulp');
const browserify = require('browserify');
const stringify = require('stringify');
const jison = require('gulp-jison');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

gulp.task('build-ui', () => {
    let b = browserify({
        entries: './ui/app.js',
        transform: stringify({
            appliesTo: { includeExtensions: [ '.html' ] }
        })
    });

    return b.bundle()
        .pipe(source('MiniURL.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js/'));
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

gulp.task('default', [ 'compile-url-parser', 'build-ui' ]);
