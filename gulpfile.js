var gulp = require('gulp'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    insert = require('gulp-insert'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    ejs = require('gulp-ejs-precompiler'),
  usemin = require('gulp-usemin');
/*   wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html');*/
var resPath='app/src/';
var paths = {
    scripts: 'js/**/*.js',
    styles: 'css/**/*.css',
    images: 'img/**/*.*',
    index: 'login.html',
    templates: 'templates/**/*.nxt',
    plugins:'plugins/**/*.*',
};
var resDestPath='app/public/';
var dest={
    templates: 'templates',
}
/*
*precompile templates EJS
*/

gulp.task('ejs-templates', function() {
    return gulp.src(resPath+paths.templates)
        .pipe(plumber())
        .pipe(ejs({
            compileDebug: true,
            client: true
        }))
        .pipe(concat('templates.js'))
        .pipe(insert.prepend('window.templates = {};'+"\n"))
        .pipe(gulp.dest(resDestPath+dest.templates));
});
/**
 * Handle bower components from index html
 */
gulp.task('usemin', function() {
    return gulp.src(resPath+paths.index)
        .pipe(usemin({
            js: ['concat'],
            css: ['concat'],
        }))
        .pipe(gulp.dest(resDestPath));
});

/**
 * Copy assets
 */
/*gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib'));
});*/

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'ejs-templates']);

gulp.task('custom-images', function() {
    return gulp.src(resPath+paths.images)
        .pipe(gulp.dest(resDestPath+'img'));
});

gulp.task('custom-js', function() {
    return gulp.src(resPath+paths.scripts)
       
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest(resDestPath+'js'));
});

gulp.task('custom-less', function() {
    return gulp.src(resPath+paths.styles)
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(resDestPath+'css'));
});


/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([resPath+paths.images], ['custom-images']);
    gulp.watch([resPath+paths.styles], ['custom-less']);
    gulp.watch([resPath+paths.scripts], ['custom-js']);
    gulp.watch([resPath+paths.templates], ['custom-templates']);
    gulp.watch([resPath+paths.index], ['usemin']);
});

/**
 * Live reload server
 */
/*gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: false,
        port: process.env.PORT || 8800
    });
});*/

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin','build-custom']);
gulp.task('default', ['build', 'watch']);