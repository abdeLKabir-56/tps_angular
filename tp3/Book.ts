import { Status, Format, BookData } from './Types';

export default class Book {
  title: string;
  author: string;
  pages: number;
  status: Status;
  price: number;
  pagesRead: number;
  format: Format;
  suggestedBy: string;
  finished: boolean;

  constructor(data: BookData) {
    this.title = data.title;
    this.author = data.author;
    this.pages = data.pages;
    this.status = data.status;
    this.price = data.price;
    this.pagesRead = data.pagesRead;
    this.format = data.format;
    this.suggestedBy = data.suggestedBy;
    this.finished = data.finished ?? this.pagesRead >= this.pages;
  }

  currentlyAt(): string {
    return `${((this.pagesRead / this.pages) * 100).toFixed(1)}% completed`;
  }

  updateProgress(pagesRead: number): void {
    this.pagesRead = pagesRead;
    this.finished = this.pagesRead >= this.pages;
  }

  deleteBook(): string {
    return `Book ${this.title} deleted.`;
  }
}
