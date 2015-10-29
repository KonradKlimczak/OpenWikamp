var gulp = require('gulp');

var generated = 'generated/';

gulp.task('default', function () {
    console.log('||----------------------||');
    console.log('|| Gulp Assets Generator||');
    console.log('|| ver. 1.0.0           ||');
    console.log('|| by kklimczak         ||');
    console.log('||----------------------||');
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
        'angular/angular.min.js',
        'angular-ui-router/release/angular-ui-router.min.js'
    ], {
        cwd: 'bower_components/'
    }).pipe(gulp.dest(generated+'js/'));

    // copy RequireJS

    gulp.src([
        'node_modules/require.js/build/require.min.js'
    ]).pipe(gulp.dest(generated+'js/'))
});
