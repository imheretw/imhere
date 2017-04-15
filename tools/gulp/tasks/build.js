import gulp from 'gulp';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import plugins from 'gulp-load-plugins';
import vfs from 'vinyl-fs';
import _ from 'lodash';
import { PATHS, DEST, CLIENT } from '../config';

const $ = plugins({
  pattern: ['gulp-*', 'main-bower-files'],
});

// build everything
gulp.task('build', ['build:client', 'build:server']);

// build client-side files
gulp.task('build:client', _.map(CLIENT, 'name').concat('bower'));

// build server-side files
gulp.task('build:server', ['transpile', 'views', 'ln', 'copy']);

// optimize images
gulp.task('images', () => {
  const task = _.find(CLIENT, { name: 'images' });

  gulp.src(task.src)
    .pipe($.changed(task.dest))
    .pipe($.imagemin())
    .pipe(gulp.dest(task.dest))
    .pipe($.print(fp => `image: ${fp}`));
});

// optimize attachments
gulp.task('attachments', () => {
  const task = _.find(CLIENT, { name: 'attachments' });

  gulp.src(task.src)
    .pipe($.changed(task.dest))
    .pipe($.imagemin())
    .pipe(gulp.dest(task.dest))
    .pipe($.print(fp => `attachment: ${fp}`));
});

// compile sass, sourcemaps, autoprefix, minify
gulp.task('styles', () => {
  const task = _.find(CLIENT, { name: 'styles' });

  gulp.src(task.src)
    .pipe($.changed(task.dest, {
      extension: '.css',
    }))
    .pipe($.plumber({
      errorHandler: function errorHandler(err) {
        $.util.log(err);
        this.emit('end');
      },
    }))
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(task.dest))
    .pipe($.print(fp => `style: ${fp}`));
});

// transpile scripts, sourcemaps, minify
gulp.task('scripts', ['lint:scripts'], () => {
  const task = PATHS.scripts;

  gulp.src(task.src)
    .pipe($.changed(task.dest))
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['es2015', 'es2016', 'es2017'],
      plugins: [
        [
          'transform-runtime', {
            polyfill: false,
            regenerator: true,
          },
        ],
      ],
    }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(task.dest))
    .pipe($.print(fp => `script: ${fp}`));
});

// copy files over to destination
gulp.task('files', () => {
  const task = _.find(CLIENT, { name: 'files' });

  gulp.src(task.src)
    .pipe($.changed(task.dest))
    .pipe(gulp.dest(task.dest))
    .pipe($.print(fp => `file: ${fp}`));
});

// generate webfonts and css from ttf fonts
gulp.task('fonts', (done) => {
  const task = _.find(CLIENT, { name: 'fonts' });
  // eot
  gulp.src(task.src)
    .pipe($.changed(task.dest))
    .pipe($.ttf2eot())
    .pipe(gulp.dest(task.dest))
    .pipe($.print(fp => `font: ${fp}`));

  // woff
  gulp.src(task.src)
    .pipe($.changed(task.dest))
    .pipe($.ttf2woff())
    .pipe(gulp.dest(task.dest))
    .pipe($.print(fp => `font: ${fp}`));

  // woff2
  gulp.src(task.src)
    .pipe($.changed(task.dest))
    .pipe($.ttf2woff2())
    .pipe(gulp.dest(task.dest))
    .pipe($.print(fp => `font: ${fp}`));

  // css
  gulp.src(task.src)
    .pipe($.changed(task.dest))
    .pipe($.tap((file) => {
      mkdirp(task.dest, (err) => {
        if (err) $.util.log(err);
        const fname = path.basename(file.path, '.ttf');
        const fp = path.join(task.dest, `${fname}.css`);
        const css = `@font-face {
    font-family: "${fname}";
    src: url("${fname}.eot");
    src: url("${fname}.eot?#iefix") format("embedded-opentype"),
         url("${fname}.woff2") format("woff2"),
         url("${fname}.woff") format("woff"),
         url("${fname}.ttf") format("truetype");
    font-weight: 300;
    font-style: normal;
}`;
        fs.writeFileSync(fp, css);
      });
    }))
    .pipe(gulp.dest(task.dest))
    .pipe($.print(fp => `font: ${fp}`));
  done();
});

// copy views over to destination
gulp.task('views', () =>
  gulp.src(PATHS.views[0].src)
    .pipe($.changed(PATHS.views[0].dest))
    .pipe(gulp.dest(PATHS.views[0].dest))
    .pipe($.print(fp => `view: ${fp}`))
);

// symlink package.json and node_modules to destination
gulp.task('ln', () =>
  vfs.src(['package.json', 'node_modules'], {
    followSymlinks: false,
  })
    .pipe(vfs.symlink(DEST))
    .pipe($.print(fp => `symlink: ${fp}`))
);
