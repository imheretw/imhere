import gulp from 'gulp';
import del from 'del';
import { DEST, ALL } from '../config';

// create clean tasks
ALL.forEach(task => gulp.task(`clean:${task.name}`, () => del([task.dest])));

// clean everything!
gulp.task('clean', () => del([DEST]));

// clear cache
gulp.task('clear', done => $.cache.clearAll(done));
