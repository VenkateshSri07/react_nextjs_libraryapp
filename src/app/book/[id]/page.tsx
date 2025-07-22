import Link from 'next/link';
import { getBook, deleteBookAction } from '../../actions';

export default async function BookDetail({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Published:</strong> {book.published}</p>
      <p><strong>Status:</strong> {book.available ? 'Available' : 'Checked Out'}</p>

      <Link href={`/book/${book.id}/edit`}>✏️ Edit Book</Link>

      <form action={deleteBookAction} style={{ marginTop: '1rem' }}>
        <input type="hidden" name="id" value={book.id} />
        <button type="submit" style={{ color: 'white', background: 'crimson' }}>
          🗑️ Delete Book
        </button>
      </form>
    </div>
  );
}
