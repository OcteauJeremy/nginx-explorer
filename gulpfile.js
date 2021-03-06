// Include Gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var rename = require('gulp-rename');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var order = require('gulp-order');
var chmod = require('gulp-chmod');
var bower = require('gulp-bower');
var mainBowerFiles = require('main-bower-files');

// Define default destination folder
var dest = 'www/';

gulp.task('js', ['bower-install'], function() {
  var jsFiles = ['src/js/*'];
  var bowerFile = mainBowerFiles();
      gulp.src(bowerFile.concat(jsFiles))
    .pipe(filter('*.js'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(chmod(644))
    .pipe(gulp.dest(dest));
});

gulp.task('css', ['bower-install'], function() {
  var cssFiles = ['src/css/*'];
  var bowerFile = mainBowerFiles();
      gulp.src(bowerFile.concat(cssFiles))
    .pipe(filter('*.css'))
    .pipe(order([
        'reset.css',
        'tablesort.css',
        'file.css',
        '*'
    ]))
    .pipe(concat('main.css'))
    .pipe(minifyCss())
    .pipe(chmod(644))
    .pipe(gulp.dest(dest));
});

gulp.task('html', ['bower-install'], function() {
  var htmlFiles = ['src/html/*'];
    gulp.src(htmlFiles)
    .pipe(filter('*.html'))
    .pipe(minifyHtml())
    .pipe(chmod(644))
    .pipe(gulp.dest(dest));
});

gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build', ['bower-install', 'js', 'css', 'html']);

gulp.task('bower-install', function(){
    return bower();
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'js']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/html/*.html', ['html']);
});

gulp.task('default', ['lint', 'build']);
