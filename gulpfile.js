var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  typescript = require('gulp-typescript'),
  webserver = require('gulp-webserver'),
  tscConfig = require('./tsconfig.json'),
  del = require('del'),
  runSequence = require('run-sequence');

var appSrc = './dist/';
var tsProject = typescript.createProject('tsconfig.json');

gulp.task('build', function (callback) {
  runSequence('clean', ['copylibs', 'copystatic', 'typescript'], callback);
});

gulp.task('clean', function () {
  return del(appSrc);
});

gulp.task('copylibs', function () {
  return gulp
    .src([
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/zone.js/dist/*.js',
      'node_modules/core-js/**/*.js',
      'node_modules/reflect-metadata/*.js',
      'node_modules/rxjs/**/*.js',
      'node_modules/@angular/**/*.js'
    ], { base: 'node_modules' })
    .pipe(gulp.dest(appSrc + 'vendor'));
});

gulp.task('typescript', function () {
  return gulp
    .src(['src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(appSrc));
});

var staticFiles = [
  'src/**/*.html',
  'src/**/*.css',
  'src/**/*.ico',
  'src/**/*.png',
  'src/**/*.svg',
  'src/**/*.jpg',
  'src/**/*.ttf',
  'src/**/*.woff2',
  'src/**/*.webapp',
  'src/systemjs.config.js'
];
gulp.task('copystatic', function () {
  return gulp
    .src(staticFiles)
    .pipe(gulp.dest(appSrc));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['typescript']);
  gulp.watch(staticFiles, ['copystatic']);
});

gulp.task('webserver', function () {
  gulp.src(appSrc)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', function (callback) {
  runSequence('clean', 'build', ['watch', 'webserver'], callback);
});