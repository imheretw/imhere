import path from 'path';

// base directories, paths, etc.
export const SRC = 'src';
export const TEST = 'test';
export const DEST = 'build';
export const PATHS = {
  // client
  styles: {
    src: path.join(SRC, 'styles/**/*.scss'),
    dest: path.join(DEST, 'static/css'),
  },
  images: {
    src: path.join(SRC, 'images/**/*'),
    dest: path.join(DEST, 'static/images'),
  },
  attachments: {
    src: path.join(SRC, 'static/attachments/**/*'),
    dest: path.join(DEST, 'static/attachments'),
  },
  scripts: {
    src: path.join(SRC, 'scripts/**/*.js'),
    dest: path.join(DEST, 'static/js'),
  },
  files: {
    src: path.join(SRC, 'files/**/*'),
    dest: path.join(DEST, 'static/files'),
  },
  fonts: {
    src: path.join(SRC, 'fonts/**/*.ttf'),
    dest: path.join(DEST, 'static/fonts'),
  },

  // server
  app: {
    src: path.join(SRC, 'app.js'),
    dest: DEST,
  },
  routes: {
    src: path.join(SRC, 'app/routes.js'),
    dest: path.join(DEST, 'app'),
  },
  boots: {
    src: path.join(SRC, 'app/boots/**/*.js'),
    dest: path.join(DEST, 'app/boots'),
  },
  configDir: {
    src: path.join(SRC, 'config/**/*.js'),
    dest: path.join(DEST, 'config/'),
  },
  database: {
    src: path.join(SRC, 'database.js'),
    dest: DEST,
  },
  jobs: {
    src: path.join(SRC, 'app/jobs/**/*.js'),
    dest: path.join(DEST, 'app/jobs'),
  },
  middlewares: {
    src: path.join(SRC, 'app/middlewares/**/*.js'),
    dest: path.join(DEST, 'app/middlewares'),
  },
  models: {
    src: path.join(SRC, 'app/models/**/*.js'),
    dest: path.join(DEST, 'app/models'),
  },
  services: {
    src: path.join(SRC, 'app/services/**/*.js'),
    dest: path.join(DEST, 'app/services'),
  },
  lib: {
    src: path.join(SRC, 'lib/**/*.js'),
    dest: path.join(DEST, 'lib'),
  },
  errors: {
    src: path.join(SRC, 'app/errors/**/*.js'),
    dest: path.join(DEST, 'app/errors'),
  },
  views: {
    src: path.join(SRC, 'app/views/**/*.pug'),
    dest: path.join(DEST, 'app/views'),
  },
  controllers: {
    src: path.join(SRC, 'app/controllers/**/*.js'),
    dest: path.join(DEST, 'app/controllers'),
  },
  helpers: {
    src: path.join(SRC, 'app/helpers/**/*.js'),
    dest: path.join(DEST, 'app/helpers'),
  },
};

// commonly used sets pertaining to tasks
// set of all keys of PATHS
export const ALL = new Set(Object.keys(PATHS));

// client-related set
export const CLIENT = new Set(['styles', 'images', 'attachments', 'scripts', 'files', 'fonts']);

// server-related set, i.e. ALL - CLIENT
export const SERVER = new Set([...ALL].filter(el => !CLIENT.has(el)));

// set of things that need to be transpiled, i.e. SERVER - {'views'}
export const TRANSPILE = new Set([...SERVER].filter(el => el !== 'views'));

// set of things that need to be linted, i.e. TRANSPILE ∪ {'scripts'}
export const LINT = new Set([...TRANSPILE, 'scripts']);
