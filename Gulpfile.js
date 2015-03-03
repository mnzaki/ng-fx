var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    notify  = require('gulp-notify'),
    min     = require('gulp-ng-annotate'),
    uglify  = require('gulp-uglify'),
    jshint  = require('gulp-jshint'),
    sync    = require('run-sequence').use(gulp),
    vp      = require('vinyl-paths'),
    del     = require('del');

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
    // .pipe(jshint({
    //   globals: {
    //     'TweenMax': true,
    //     'TimelineMax': true,
    //     'angular': true
    //   }
    // }))
    // .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify({message: 'Linting done'}));
});

gulp.task('concat:bundle', function(){
  return gulp.src(paths.scripts)
    .pipe(concat('ngFxBundle.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minify:bundle', function(){
  return gulp.src(paths.scripts)
    .pipe(concat('ngFxBundle.min.js'))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('preMin:bundle', ['minify:bundle'],function(){
  return gulp.src('./dist/ngFxBundle.min.js')
    .pipe(min())
    .pipe(gulp.dest(paths.dist))
    // .pipe(notify({message: 'Min done'}));
});

gulp.task('uglify:bundle', ['preMin:bundle'],function(){
  return gulp.src('./dist/ngFxBundle.min.js')
   .pipe(uglify())
   .pipe(gulp.dest(paths.dist))
  //  .pipe(notify({message: 'Build Done'}));
});



gulp.task('concat', function(){
  return gulp.src(paths.source)
    .pipe(concat('ngFx.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minify', function(){
  return gulp.src(paths.source)
    .pipe(concat('ngFx.min.js'))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('preMin', ['minify'],function(){
  return gulp.src('./dist/ngFx.min.js')
    .pipe(min())
    .pipe(gulp.dest(paths.dist))
    // .pipe(notify({message: 'Min done'}));
});

gulp.task('uglify', ['preMin'],function(){
  return gulp.src('./dist/ngFx.min.js')
   .pipe(uglify())
   .pipe(gulp.dest(paths.dist))
  //  .pipe(notify({message: 'Build Done'}));
});



gulp.task('build:bundle', ['concat:bundle','uglify:bundle']);
gulp.task('build:single', ['concat', 'uglify']);

gulp.task('build', ['build:single','build:bundle']);

// gulp.task('build', function(done){
//   sync('clean', 'build:single', 'build:bundle', done);
// });

gulp.task('clean', function(){
  return gulp.src([paths.dist])
    .pipe(vp(del));
});

gulp.task('watch', function(){
  gulp.watch(paths.source, ['build']);
});

gulp.task('default', ['build' ,'watch']);
