import gulp from 'gulp';
import path from 'path';
import plugins from 'gulp-load-plugins';
import { DEST } from '../config';

const $ = plugins({
  pattern: ['gulp-*', 'main-bower-files'],
});

// start express server and reload when server-side files change
gulp.task('serve', ['watch'], () =>
  $.nodemon({
    exec: 'node-inspector & node --debug',
    script: path.join(DEST, 'server.js'),
    watch: path.join(DEST, '**/*.js'),
    ignore: path.join(DEST, 'static'),
  })
);
