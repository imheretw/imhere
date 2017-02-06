import gulp from 'gulp';
import path from 'path';
import run from 'gulp-run';
import { SRC, TEST } from '../config';

// watch all js files for changes and run test
gulp.task('watch:test', () => {
  gulp.watch([path.join(SRC, '**/*.js'), path.join(TEST, '**/*.js')], ['test']);
});

gulp.task('test', () => run('npm run test').exec());
