import gulp from 'gulp';
import { PATHS, TRANSPILE, ALL } from '../config';

gulp.task('watch', ['build'], () => {
  for (const task of ALL) {
    // tanspile tasks
    if (TRANSPILE.has(task)) gulp.watch(PATHS[task].src, [`transpile:${task}`]);

    // add some delay for images
    else if (task === 'images') {
      gulp.watch(PATHS.images.src, {
        debounceDelay: 2500,
      }, ['images']);
    } else gulp.watch(PATHS[task].src, [task]);
  }

  // also lint this gulpfile on save
  gulp.watch('gulpfile.babel.js', ['lint:gulpfile']);
});
