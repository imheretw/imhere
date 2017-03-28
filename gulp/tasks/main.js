import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import { DEST } from '../config';

const $ = plugins({
  pattern: ['gulp-*', 'main-bower-files'],
});

// default task is the same as serve
gulp.task('default', ['serve']);

gulp.task('copy', () =>
  gulp.src('pm2.config.js')
    .pipe(gulp.dest(DEST))
    .pipe($.print(fp => `copy: ${fp}`))
);

// show all tasks
gulp.task('tasks', $.taskListing);
