import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import { PATHS } from '../config';

const $ = plugins({
  pattern: ['gulp-*', 'main-bower-files'],
});

// move bower files to destination directory
gulp.task('bower', ['bower:js', 'bower:css']);

// concatenate and minify bower js
gulp.task('bower:js', () =>
  gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.js'))
    .pipe($.print(fp => `bower: ${fp}`)) // ensure concat order
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest(PATHS.scripts.dest))
    .pipe($.print(fp => `bower: ${fp}`))
    .pipe($.cache($.uglify()))
    .pipe($.rename('vendor.min.js'))
    .pipe(gulp.dest(PATHS.scripts.dest))
    .pipe($.print(fp => `bower: ${fp}`))
);

// move bower css
gulp.task('bower:css', () =>
  gulp.src($.mainBowerFiles())
    .pipe($.changed(PATHS.styles.dest))
    .pipe($.filter('**/*.css'))
    .pipe(gulp.dest(PATHS.styles.dest))
    .pipe($.print(fp => `bower: ${fp}`))
);
