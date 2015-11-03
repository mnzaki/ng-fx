import gulp      from 'gulp';
import sync      from 'run-sequence';
import vp        from 'vinyl-paths';
import del       from 'del';
import bump      from 'gulp-bump';
import changelog from 'conventional-changelog';
import fs        from 'fs';
import webpack   from 'webpack-stream';
import yargs     from 'yargs';
import template  from 'gulp-template';
import rename    from 'gulp-rename';
import camelcase from 'camelcase';
import browser, {reload}  from 'browser-sync';

const argv = yargs.argv;

const validBumpTypes = 'major|minor|patch|prerelease'.split('|');
const Bump = (argv.bump || 'patch').toLowerCase();

if (validBumpTypes.indexOf(Bump) === -1) {
  throw new Error('Unrecognized bump "' + Bump + '".');
}

const args = { bump: Bump };

const paths = {
  source: ['src/**/*.js'],
  entry: 'src/app.js',
  output: './dist',
  animations: {
    element: 'src/animations/element',
    view: 'src/animations/view'
  },
  templates: 'templates/**/*.**'
};

gulp.task('del:change', () => {
  return gulp.src('./CHANGELOG.md')
    .pipe(vp(del));
});

/*gulp.task('clean', () =>{
  return gulp.src(paths.output)
    .pipe(vp(del));
});*/

gulp.task('bump-version', () => {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({ type:args.bump })) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
});

gulp.task('changelog', done => {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  return changelog({
    repository: pkg.repository.url,
    version: pkg.version,
    file: './CHANGELOG.md',
    subtitle: argv.codename || ''
  }, (err, log) => {
    fs.writeFileSync('./CHANGELOG.md', log);
    done();
  });
});

gulp.task('release', done => {
  return sync(
    'build',
    'bump-version',
    'del:change',
    'changelog',
    done
  );
});

gulp.task('js-min', () => {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.configmin')))
    .pipe(gulp.dest(paths.output));
});

gulp.task('js', () => {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.output));
});

gulp.task('animation', () => {
  let {name, type='element'} = argv;
  name = camelcase(name);
  const dashName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const destPath = `${paths.animations[type]}/${name}`;

  return gulp.src(paths.templates)
    .pipe(template({name, dashName}))
    .pipe(rename(path => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});


gulp.task('serve-demo', ()=> {
  browser({
    open: false,
    port: process.env.PORT || 9000,
    server: {
      baseDir: ['./demoApp', 'node_modules', 'dist']
    }
  });
  const files = [paths.output + '/ngFx.js', 'demoApp/**/*.{js,html,css}'];
  gulp.watch(files).on('change', reload);
});

gulp.task('build', done => {
  sync(['js', 'js-min'], done);
});

gulp.task('watch', () => {
  gulp.watch(paths.source, ['js']);
});

gulp.task('dev', done => {
  sync('js', 'serve-demo', 'watch', done);
});

gulp.task('default', done => {
  sync('js', 'watch', done);
});
