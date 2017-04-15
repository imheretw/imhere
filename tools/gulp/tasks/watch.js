import gulp from 'gulp';
import { TRANSPILE, CLIENT } from '../config';

gulp.task('watch', ['build'], () => {
  TRANSPILE.forEach((task) => {
    gulp.watch(task.src, [`transpile:${task.name}`]);
  });

  CLIENT.forEach((task) => {
    // add some delay for images
    if (task.name === 'images') {
      gulp.watch(task.src, {
        debounceDelay: 2500,
      }, ['images']);
    } else gulp.watch(task.src, [task.name]);
  });

  // also lint this gulpfile on save
  gulp.watch('gulpfile.babel.js', ['lint:gulpfile']);
});
