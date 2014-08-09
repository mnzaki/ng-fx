var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    notify  = require('gulp-notify'),
    min     = require('gulp-ngmin'),
    uglify  = require('gulp-uglify'),
    jshint  = require('gulp-jshint');

var paths = {
  scripts: [
    './bower_components/gsap/src/uncompressed/TweenMax.js',
    './bower_components/angular-animate/angular-animate.js',
    './src/animationsAssist.js',
    './src/animationClass.js',
    './src/animations/*.js',

    './src/transitionsAssist.js',
    './src/transitionsClass.js',
    './src/transitions/*.js',
    './src/domAnimations/*.js',
    './src/directives/*.js',
    './src/animate.js'
  ],

  source: [
    './src/animationsAssist.js',
    './src/animationClass.js',
    './src/animations/*.js',
    './src/transitionsAssist.js',
    './src/transitionsClass.js',
    './src/transitions/*.js',
    './src/domAnimations/*.js',
    './src/directives/*.js',
    './src/animate.js'
  ],

  dist: './dist/'
};

gulp.task('lint', function(){
  return gulp.src(paths.source)
    .pipe(jshint({
      globals: {
        'TweenMax': true,
        'TimelineMax': true,
        'angular': true
      }
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify({message: 'Linting done'}));
});

gulp.task('concat', function(){
  return gulp.src(paths.scripts)
    .pipe(concat('ngFx.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minify', function(){
  return gulp.src(paths.scripts)
    .pipe(concat('ngFx.min.js'))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('preMin', ['minify'],function(){
  return gulp.src('./dist/ngFx.min.js')
    .pipe(min())
    .pipe(gulp.dest(paths.dist))
    .pipe(notify({message: 'Min done'}));
});

gulp.task('uglify', ['preMin'],function(){
  return gulp.src('./dist/ngFx.min.js')
   .pipe(uglify())
   .pipe(gulp.dest(paths.dist))
   .pipe(notify({message: 'Build Done'}));
});


gulp.task('build', ['lint', 'concat','uglify']);

gulp.task('watch', function(){
  gulp.watch(paths.source, ['build']);
});

gulp.task('default', ['build' ,'watch']);
