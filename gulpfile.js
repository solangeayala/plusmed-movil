var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var templateCache = require('gulp-angular-templatecache');
var inject = require('gulp-inject');

var paths = {
    templateCache: ['./www/templates/**/*.html'],
    sass: ['./scss/**/*.scss'],
    javascript: [
        './www/**/*.js',
        './www/js/**/*.js',
        './www/lib/**',
        './www/js/controllers/**/*.js',
        './www/js/directives/**/*.js',
        './www/js/services/**/*.js'
    ],
    css: [
        './www/**/*.css',
        '!./www/css/ionic.app*.css',
        '!./www/lib/**'
    ]
};

var config = {
    srcTemplates: [
        'www/templates/**/*.html',
    ],
    dest: 'www/js/'
};

gulp.task('default', ['sass', 'templatecache', 'index']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('templatecache', function(done) {
    return gulp.src(config.srcTemplates)
        .pipe(templateCache('templateCache.js', { module: 'templateCache', standalone: true }))
        .pipe(gulp.dest(config.dest));
});

gulp.task('index', function() {
    return gulp.src('./www/index.html')
        .pipe(inject(
            gulp.src(paths.javascript, { read: false }), { relative: true }))
        .pipe(gulp.dest('./www'))
        .pipe(inject(
            gulp.src(paths.css, { read: false }), { relative: true }))
        .pipe(gulp.dest('./www'));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.templateCache, ['templatecache']);
    gulp.watch([
        paths.javascript,
        paths.css
    ], ['index']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});