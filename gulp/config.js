import path from 'path';

// base directories, paths, etc.
export const SRC = 'src';
export const TEST = 'test';
export const DEST = 'build';
export const PATHS = {
  // client
  assets: [
    {
      name: 'styles',
      src: path.join(SRC, 'styles/**/*.scss'),
      dest: path.join(DEST, 'static/css'),
    },
    {
      name: 'images',
      src: path.join(SRC, 'images/**/*'),
      dest: path.join(DEST, 'static/images'),
    },
    {
      name: 'attachments',
      src: path.join(SRC, 'static/attachments/**/*'),
      dest: path.join(DEST, 'static/attachments'),
    },
    {
      name: 'files',
      src: path.join(SRC, 'files/**/*'),
      dest: path.join(DEST, 'static/files'),
    },
    {
      name: 'fonts',
      src: path.join(SRC, 'fonts/**/*.ttf'),
      dest: path.join(DEST, 'static/fonts'),
    },
  ],

  scripts: {
    name: 'scripts',
    src: path.join(SRC, 'scripts/**/*.js'),
    dest: path.join(DEST, 'static/js'),
  },

  views: [{
    name: 'views',
    src: path.join(SRC, 'app/views/**/*.pug'),
    dest: path.join(DEST, 'app/views'),
  }],

  // server
  transpile: [
    {
      name: 'app:entry',
      src: path.join(SRC, '*.js'),
      dest: DEST,
    },
    {
      name: 'app',
      src: path.join(SRC, 'app/**/*.js'),
      dest: path.join(DEST, 'app'),
    },
    {
      name: 'config',
      src: path.join(SRC, 'config/**/*.js'),
      dest: path.join(DEST, 'config'),
    },
    {
      name: 'lib',
      src: path.join(SRC, 'lib/**/*.js'),
      dest: path.join(DEST, 'lib'),
    },
  ],
};

// commonly used sets pertaining to tasks
// set of all keys of PATHS
export const ALL = new Set([...PATHS.assets, PATHS.scripts, ...PATHS.transpile]);

// client-related set
export const CLIENT = [...PATHS.assets, PATHS.scripts];

export const TRANSPILE = new Set(PATHS.transpile);

// set of things that need to be linted, i.e. TRANSPILE ∪ {'scripts'}
export const LINT = new Set([...TRANSPILE, PATHS.scripts]);
