export enum Status {
    Read = 'Read',
    ReRead = 'Re-read',
    DNF = 'DNF',
    CurrentlyReading = 'Currently reading',
    ReturnedUnread = 'Returned Unread',
    WantToRead = 'Want to read',
  }
  
  export enum Format {
    Print = 'Print',
    PDF = 'PDF',
    Ebook = 'Ebook',
    AudioBook = 'AudioBook',
  }
  
  export interface BookData {
    title: string;
    author: string;
    pages: number;
    status: Status;
    price: number;
    pagesRead: number;
    format: Format;
    suggestedBy: string;
    finished?: boolean;
  }
  