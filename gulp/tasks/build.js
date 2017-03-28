import gulp from 'gulp';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import plugins from 'gulp-load-plugins';
import vfs from 'vinyl-fs';
import { PATHS, DEST, CLIENT } from '../config';

const $ = plugins({
  pattern: ['gulp-*', 'main-bower-files'],
});

// build everything
gulp.task('build', ['build:client', 'build:server']);

// build client-side files
gulp.task('build:client', [...CLIENT].concat('bower'));

// build server-side files
gulp.task('build:server', ['transpile', 'views', 'ln', 'copy']);

// optimize images
gulp.task('images', () =>
  gulp.src(PATHS.images.src)
    .pipe($.changed(PATHS.images.dest))
    .pipe($.imagemin())
    .pipe(gulp.dest(PATHS.images.dest))
    .pipe($.print(fp => `image: ${fp}`))
);

// optimize attachments
gulp.task('attachments', () =>
  gulp.src(PATHS.attachments.src)
    .pipe($.changed(PATHS.attachments.dest))
    .pipe($.imagemin())
    .pipe(gulp.dest(PATHS.attachments.dest))
    .pipe($.print(fp => `attachment: ${fp}`))
);

// compile sass, sourcemaps, autoprefix, minify
gulp.task('styles', () =>
  gulp.src(PATHS.styles.src)
    .pipe($.changed(PATHS.styles.dest, {
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
    .pipe(gulp.dest(PATHS.styles.dest))
    .pipe($.print(fp => `style: ${fp}`))
);

// transpile scripts, sourcemaps, minify
gulp.task('scripts', ['lint:scripts'], () =>
  gulp.src(PATHS.scripts.src)
    .pipe($.changed(PATHS.scripts.dest))
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
    .pipe(gulp.dest(PATHS.scripts.dest))
    .pipe($.print(fp => `script: ${fp}`))
);

// copy files over to destination
gulp.task('files', () =>
  gulp.src(PATHS.files.src)
    .pipe($.changed(PATHS.files.dest))
    .pipe(gulp.dest(PATHS.files.dest))
    .pipe($.print(fp => `file: ${fp}`))
);

// generate webfonts and css from ttf fonts
gulp.task('fonts', (done) => {
  // eot
  gulp.src(PATHS.fonts.src)
    .pipe($.changed(PATHS.fonts.dest))
    .pipe($.ttf2eot())
    .pipe(gulp.dest(PATHS.fonts.dest))
    .pipe($.print(fp => `font: ${fp}`));

  // woff
  gulp.src(PATHS.fonts.src)
    .pipe($.changed(PATHS.fonts.dest))
    .pipe($.ttf2woff())
    .pipe(gulp.dest(PATHS.fonts.dest))
    .pipe($.print(fp => `font: ${fp}`));

  // woff2
  gulp.src(PATHS.fonts.src)
    .pipe($.changed(PATHS.fonts.dest))
    .pipe($.ttf2woff2())
    .pipe(gulp.dest(PATHS.fonts.dest))
    .pipe($.print(fp => `font: ${fp}`));

  // css
  gulp.src(PATHS.fonts.src)
    .pipe($.changed(PATHS.fonts.dest))
    .pipe($.tap((file) => {
      mkdirp(PATHS.fonts.dest, (err) => {
        if (err) $.util.log(err);
        const fname = path.basename(file.path, '.ttf');
        const fp = path.join(PATHS.fonts.dest, `${fname}.css`);
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
    .pipe(gulp.dest(PATHS.fonts.dest))
    .pipe($.print(fp => `font: ${fp}`));
  done();
});

// copy views over to destination
gulp.task('views', () =>
  gulp.src(PATHS.views.src)
    .pipe($.changed(PATHS.views.dest))
    .pipe(gulp.dest(PATHS.views.dest))
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
