'use client';
import { updateBook, getBook } from '../../../actions';
import { useEffect, useState } from 'react';

export default function EditPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    getBook(params.id).then(setBook);
  }, [params.id]);

  if (!book) return <p>Loading...</p>;

  return (
    <form action={formData => updateBook(params.id, formData)}>
      <h2>Edit Book</h2>
      <input name="title" defaultValue={book.title} required />
      <input name="author" defaultValue={book.author} required />
      <input name="isbn" defaultValue={book.isbn} required />
      <input name="published" type="date" defaultValue={book.published} required />
      <label>
        <input type="checkbox" name="available" defaultChecked={book.available} /> Available
      </label>
      <button type="submit">Save</button>
    </form>
  );
}
