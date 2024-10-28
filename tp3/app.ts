import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import Book, { IBook } from './BookSchema';

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/bookTracker', {})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));


app.use(express.static(path.join(__dirname, './')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, './', 'index.html'));
});


app.post('/add-book', async (req: Request, res: Response) => {
  try {
    const bookData: IBook = req.body;
    const book = new Book(bookData);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error saving book', error });
  }
});


app.get('/books', async (req: Request, res: Response) => {
  try {
    const books = await Book.find({});
    console.log(books);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});


app.listen(3000, () => console.log('Server started on http://localhost:3000'));
