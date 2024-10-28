import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  pages: number;
  status: 'Read' | 'Re-read' | 'DNF' | 'Currently reading' | 'Returned Unread' | 'Want to read';
  price: number;
  pagesRead: number;
  format: 'Print' | 'PDF' | 'Ebook' | 'AudioBook';
  suggestedBy: string;
  finished: boolean;
}

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  numberOfPages: { type: Number, required: true },  // This was previously 'pages'
  status: { type: String, required: true },
  price: { type: Number, required: true },
  pagesRead: { type: Number, required: true },
  format: { type: String, required: true },
  suggestedBy: { type: String },
  finished: { type: Number, required: true }
});

export default mongoose.model<IBook>('Book', bookSchema);
