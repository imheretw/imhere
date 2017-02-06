import dotenv from 'dotenv';
import factory, { BookshelfAdapter } from 'factory-girl';
factory.setAdapter(new BookshelfAdapter());

dotenv.config();
