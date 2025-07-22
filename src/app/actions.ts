'use server';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { redirect } from 'next/navigation';

const dataFile = path.resolve('C:/Users/Programming.com/Desktop/react app/libraryapp/src/', 'data', 'books.json');

async function readBooks() {
  const data = await fs.readFile(dataFile, 'utf-8');
  return JSON.parse(data);
}

async function writeBooks(books: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(books, null, 2));
}

export async function addBook(formData: FormData) {
  const books = await readBooks();
  const newBook = {
    id: uuid(),
    title: formData.get('title'),
    author: formData.get('author'),
    isbn: formData.get('isbn'),
    published: formData.get('published'),
    available: formData.get('available') === 'on',
  };
  books.push(newBook);
  await writeBooks(books);
}

export async function updateBook(id: string, formData: FormData) {
  const books = await readBooks();
  const index = books.findIndex(b => b.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      title: formData.get('title'),
      author: formData.get('author'),
      isbn: formData.get('isbn'),
      published: formData.get('published'),
      available: formData.get('available') === 'on',
    };
    await writeBooks(books);
  }
}

export async function deleteBook(id: string) {
  const books = await readBooks();
  const updated = books.filter(b => b.id !== id);
  await writeBooks(updated);
}

export async function getBook(id: string) {
  const books = await readBooks();
  return books.find(b => b.id === id);
}

export async function getAllBooks() {
  return readBooks();
}

export async function deleteBookAction(formData: FormData) {
  const id = formData.get('id')?.toString();
  if (!id) return;

  const books = await readBooks();
  const updated = books.filter(b => b.id !== id);
  await writeBooks(updated);

  redirect('/'); // Redirect to homepage after deletion
}

