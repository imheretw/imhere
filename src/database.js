import Bookshelf from 'bookshelf';

import dbConfig from '../knexfile';
import modelBase from 'bookshelf-modelbase';
import Schema from 'bookshelf-schema';
import knex from 'knex';

const environment = process.env.NODE_ENV || 'development';
const config = dbConfig[environment];
const connection = knex(config);
const _bookshelf = Bookshelf(connection);

_bookshelf.plugin('pagination');
_bookshelf.plugin(Schema());
_bookshelf.plugin(modelBase.pluggable);

export const bookshelf = _bookshelf;
export const ModelBase = modelBase(bookshelf);
