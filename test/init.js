import dotenv from 'dotenv';
import factory, { BookshelfAdapter } from 'factory-girl';

dotenv.config();
factory.setAdapter(new BookshelfAdapter());
