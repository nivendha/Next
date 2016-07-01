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
    css:'css/**/*.css',
    index: '*.html',
    templates: 'templates/**/*.nxt',
    plugins:'plugins/**/*.*',
};
var resDestPath='app/public/';
var dest={
    templates: 'templates',
}

var launchAppName='admin_lite';

var fonts={
    font_awesome:resPath+'components/font-awesome/fonts/**/*.*',
    linea_io:resPath+'components/linea-io/fonts/**/*.*'
}

var next_ImplPath={
    mainJs: 'app/src/'+launchAppName+'/main.js',
    readyJs: 'app/src/'+launchAppName+'/ready.js',
    images: 'app/src/'+launchAppName+'/img/**/*.*',
    styles: 'app/src/'+launchAppName+'/css/**/*.css',
    constants :'app/src/'+launchAppName+'/constants/*.js',
    modules: 'app/src/'+launchAppName+'/modules/*.js',
    nodes:'app/src/'+launchAppName+'/nodes/*.js',
    handlers:'app/src/'+launchAppName+'/handlers/*.js',
    templateCss:'app/src/'+launchAppName+'/custom_css/*.css',
    routes:'app/src/'+launchAppName+'/routes/*.js'
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
gulp.task('custom-fonts', ['font-awesome', 'linea-io']);
gulp.task('font-awesome', function() {
    return gulp.src(fonts.font_awesome)
        .pipe(gulp.dest(resDestPath+'fonts'));
});
gulp.task('linea-io', function() {
    return gulp.src(fonts.linea_io)
        .pipe(gulp.dest(resDestPath+'fonts'));
});
/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-fonts','ejs-templates','template-css']);

gulp.task('custom-images', function() {
    return gulp.src(next_ImplPath.images)
        .pipe(gulp.dest(resDestPath+'img'));
});

gulp.task('template-css', function() {
    return gulp.src(next_ImplPath.templateCss)
        .pipe(gulp.dest(resDestPath+'custom_css'));
});

gulp.task('custom-js', function() {
    return gulp.src(resPath+paths.scripts)
       
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest(resDestPath+'js'));
});

gulp.task('custom-less', function() {
    return gulp.src(next_ImplPath.styles)
        .pipe(concat('app_style.min.css'))
        .pipe(gulp.dest(resDestPath+'css'));
});

gulp.task('main-css', function() {
     return gulp.src(resPath+paths.css)
        .pipe(concat('nxt_base.min.css'))
        .pipe(gulp.dest(resDestPath+'css'));
});

/**
 * Handle implementation files
 */
gulp.task('build-impl', function() {
    return gulp.src([next_ImplPath.mainJs,
                    next_ImplPath.routes,
                    next_ImplPath.constants,
                    next_ImplPath.modules,
                    next_ImplPath.nodes,
                    next_ImplPath.handlers,
                    next_ImplPath.readyJs
                    ])
        .pipe(concat('scriptImpl.min.js'))
        .pipe(gulp.dest(resDestPath+'js'));
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([resPath+paths.images], ['custom-images']);
    gulp.watch([resPath+paths.styles], ['custom-less']);
    gulp.watch([resPath+paths.scripts], ['custom-js']);
    gulp.watch([resPath+paths.templates], ['ejs-templates']);
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
gulp.task('build', ['usemin','build-custom','build-impl','main-css']);
gulp.task('build-watch', ['build', 'watch']);
gulp.task('default', ['build']);