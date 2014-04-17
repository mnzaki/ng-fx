var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    notify  = require('gulp-notify');

var paths = {
  animations: [
  './src/animationsAssist.js',
  './src/animationClass.js',
  './src/animations/fade.js',
  './src/animations/bounce.js',
  './src/animate.js'
  ]
};


gulp.task('build', function(){
  return gulp.src(paths.animations)
    .pipe(concat('animations.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(notify({message: 'Build done'}));
});

gulp.task('concat', function(){
  var app = paths.animations.slice();
  app.push('./src/app.js');
  return gulp.src(app)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./src/'))
    .pipe(notify({message: 'Concat done'}));
});

gulp.task('watch', function(){
  gulp.watch(paths.animations, ['concat', 'build']);
  gulp.watch('./src/app.js', ['concat']);
});

gulp.task('default', ['build' , 'concat', 'watch']);