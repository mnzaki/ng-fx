var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    notify  = require('gulp-notify');

var paths = {
  animations: ['./src/animations/*.js', './src/animate.js', './src/app.js']
};


gulp.task('concat', function(){
  return gulp.src(paths.animations)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(notify({message: 'Concat done'}));
});


gulp.task('watch', function(){
  gulp.watch(paths.animations, ['concat']);
});

gulp.task('default', ['concat', 'watch']);