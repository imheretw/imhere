import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import { PATHS, TRANSPILE } from '../config';

const $ = plugins({
  pattern: ['gulp-*', 'main-bower-files'],
});

// create transpile tasks for server scripts
TRANSPILE.forEach((task) => {
  gulp.task(`transpile:${task}`, [`lint:${task}`], () =>
    gulp.src(PATHS[task].src)
      .pipe($.changed(PATHS[task].dest))
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
      .pipe(gulp.dest(PATHS[task].dest))
      .pipe($.print(fp => `transpiled: ${fp}`))
  );
});

// transpile everything!
gulp.task('transpile', [...TRANSPILE].map(el => `transpile:${el}`));
