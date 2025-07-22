'use client';
import { addBook } from '../../actions';

export default function AddBookPage() {
  return (
    <form action={addBook}>
      <h2>Add New Book</h2>
      <input name="title" placeholder="Title" required />
      <input name="author" placeholder="Author" required />
      <input name="isbn" placeholder="ISBN" required />
      <input name="published" type="date" required />
      <label>
        <input type="checkbox" name="available" /> Available
      </label>
      <button type="submit">Add Book</button>
    </form>
  );
}
