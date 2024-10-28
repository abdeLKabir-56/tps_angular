import Book from './Book';

async function loadBooks(): Promise<void> {
  const res = await fetch('http://localhost:3000/books');
  const books = await res.json();

  const bookList = document.getElementById('bookList') as HTMLElement;
  bookList.innerHTML = '';

  books.forEach((bookData: any) => {
    const book = new Book(
      bookData.title,
      bookData.author,
      bookData.pages,
      bookData.status,
      bookData.price,
      bookData.pagesRead,
      bookData.format,
      bookData.suggestedBy,
      bookData.finished
    );

    const bookDiv = document.createElement('div');
    bookDiv.classList.add('p-4', 'border', 'rounded', 'shadow-sm');
    bookDiv.innerHTML = `
      <h3 class="text-lg font-bold">${book.title}</h3>
      <p>${book.author} - ${book.currentlyAt()}</p>
      <p>Status: ${book.status}</p>
    `;
    bookList.appendChild(bookDiv);
  });
}

document.getElementById('bookForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookData = {
    title: (document.getElementById('title') as HTMLInputElement).value,
    author: (document.getElementById('author') as HTMLInputElement).value,
    pages: +(document.getElementById('pages') as HTMLInputElement).value,
    status: (document.getElementById('status') as HTMLSelectElement).value as any,
    price: +(document.getElementById('price') as HTMLInputElement).value,
    pagesRead: +(document.getElementById('pagesRead') as HTMLInputElement).value,
    format: (document.getElementById('format') as HTMLSelectElement).value as any,
    suggestedBy: (document.getElementById('suggestedBy') as HTMLInputElement).value,
  };

  await fetch('http://localhost:3000/add-book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });

  loadBooks();
});

loadBooks();
