var gulp      = require('gulp');
var sync      = require('run-sequence');
var vp        = require('vinyl-paths');
var del       = require('del');
var bump      = require('gulp-bump');
var changelog = require('conventional-changelog');
var fs        = require('fs');
var webpack   = require('webpack-stream');
var yargs     = require('yargs');

var argv = yargs.argv;

var validBumpTypes = 'major|minor|patch|prerelease'.split('|');
var Bump = (argv.bump || 'patch').toLowerCase();

if (validBumpTypes.indexOf(Bump) === -1) {
  throw new Error('Unrecognized bump "' + Bump + '".');
}

var args = { bump: Bump };

var paths = {
  source: ['src/**/*.js'],
  entry: 'src/app.js',
  output: './dist'
};

gulp.task('del:change', function() {
  return gulp.src('./CHANGELOG.md')
    .pipe(vp(del));
});

/*gulp.task('clean', function(){
  return gulp.src(paths.output)
    .pipe(vp(del));
});*/

gulp.task('bump-version', function() {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({ type:args.bump })) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
});

gulp.task('changelog', function(done) {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  return changelog({
    repository: pkg.repository.url,
    version: pkg.version,
    file: './CHANGELOG.md',
    subtitle: argv.codename || ''
  }, function(err, log) {
    fs.writeFileSync('./CHANGELOG.md', log);
    done();
  });
});

gulp.task('release', function(done) {
  return sync(
    'build',
    'bump-version',
    'del:change',
    'changelog',
    done
  );
});

gulp.task('js-min', function() {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.configmin')))
    .pipe(gulp.dest(paths.output));
});

gulp.task('js', function() {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build', function(done) {
  sync(['js', 'js-min'], done);
});

gulp.task('watch', function(){
  gulp.watch(paths.source, ['js']);
});

gulp.task('default', function(done) {
  sync('js', 'watch', done);
});
