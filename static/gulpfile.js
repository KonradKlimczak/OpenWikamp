var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass');

var generated = 'generated/';

gulp.task('default', function () {
    console.log('||----------------------||');
    console.log('|| Gulp Assets Generator||');
    console.log('|| ver. 1.0.0           ||');
    console.log('|| by kklimczak         ||');
    console.log('||----------------------||');
});

gulp.task('clean', function() {
    gulp.src(generated)
        .pipe(clean());
});

gulp.task('copy', ['default'], function () {

    //Copy custom files

    gulp.src([
        '**/*.*'
    ], {
        cwd: 'resources/'
    }).pipe(gulp.dest(generated));

    // copy JS files

    gulp.src([
        'angular/angular.js',
        'angular-ui-router/release/angular-ui-router.min.js'
    ], {
        cwd: 'bower_components/'
    }).pipe(gulp.dest(generated + 'js/'));

    // copy RequireJS

    gulp.src([
        'requirejs/require.js',
        'requirejs-domready/domReady.js'
    ], {
        cwd: 'bower_components/'
    }).pipe(gulp.dest(generated + 'js/'));

    // copy Foundation

    gulp.src([
        'foundation/scss/foundation/**/*.*',
        '!foundation/scss/foundation/_settings.scss'
    ], {
        cwd: 'bower_components/'
    }).pipe(gulp.dest(generated+'scss/vendor/'));
});

gulp.task('compile-sass', ['copy'], function () {
    gulp.src(generated+'scss/foundation.scss')
        .pipe(sass())
        .pipe(gulp.dest(generated+'css/'));
});
