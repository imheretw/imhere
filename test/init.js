import logger from '../src/lib/logger';

import dotenv from 'dotenv';
import factory, { BookshelfAdapter } from 'factory-girl';
factory.setAdapter(new BookshelfAdapter());

dotenv.config();
global.logger = logger;
