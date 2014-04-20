var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    notify  = require('gulp-notify'),
    min     = require('gulp-ngmin'),
    uglify  = require('gulp-uglify');

var paths = {
  animations: [
  './src/animationsAssist.js',
  './src/animationClass.js',
  './src/animations/fade.js',
  './src/animations/bounce.js',
  './src/animate.js'
  ]
};


gulp.task('concat', function(){
  return gulp.src(paths.animations)
    .pipe(concat('ng-Fx.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', function(){
  return gulp.src(paths.animations)
    .pipe(concat('ng-Fx.min.js'))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('preMin', ['minify'],function(){
  return gulp.src('./dist/ng-Fx.min.js')
    .pipe(min())
    .pipe(gulp.dest('./dist/'))
    .pipe(notify({message: 'Min done'}));
});

gulp.task('uglify', ['preMin'],function(){
  return gulp.src('./dist/ng-fx.min.js')
   .pipe(uglify())
   .pipe(gulp.dest('./dist/'))
   .pipe(notify({message: 'Build Done'}));
});

gulp.task('build', ['concat','uglify']);

gulp.task('watch', function(){
  gulp.watch(paths.animations, ['build']);
  gulp.watch('./src/app.js', ['build']);
});

gulp.task('default', ['build' ,'watch']);