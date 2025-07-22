import Link from 'next/link';
import { getAllBooks } from './actions';

type Props = {
  searchParams: {
    q?: string;
    available?: string;
    sort?: string;
    page?: string;
  };
};

const PAGE_SIZE = 5;

export default async function HomePage({ searchParams }: Props) {
  const books = await getAllBooks();

  // 🔍 Search
  const q = searchParams.q?.toLowerCase() || '';
  let filtered = books.filter(
    (book: any) =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q)
  );

  // ✅ Filter by availability
  const showAvailableOnly = searchParams.available === 'true';
  if (showAvailableOnly) {
    filtered = filtered.filter(book => book.available);
  }

  // 📊 Sort
  const sortBy = searchParams.sort || 'title';
  filtered.sort((a, b) => {
    if (sortBy === 'published') {
      return new Date(b.published).getTime() - new Date(a.published).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  // 📚 Pagination
  const page = parseInt(searchParams.page || '1', 10);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <h2>📚 Library Management</h2>

      <form method="get" className="filters">
        <input type="text" name="q" placeholder="Search..." defaultValue={q} />
        <label>
          <input
            type="checkbox"
            name="available"
            value="true"
            defaultChecked={showAvailableOnly}
          />
          Available Only
        </label>
        <select name="sort" defaultValue={sortBy}>
          <option value="title">Sort: Title</option>
          <option value="published">Sort: Date</option>
        </select>
        <button type="submit">Apply</button>
        {(q || showAvailableOnly || sortBy !== 'title') && (
          <Link href="/">Clear</Link>
        )}
      </form>

      <p>Showing {paginated.length} of {filtered.length} result(s)</p>
      <Link href="/book/new">➕ Add New Book</Link>

      <ul>
        {paginated.map((book: any) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} –
            <Link href={`/book/${book.id}`}> View </Link>
            <Link href={`/book/${book.id}/edit`}> Edit </Link>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => {
          // Construct query manually, only strings or undefined
          const query = {
            ...(searchParams.q ? { q: searchParams.q } : {}),
            ...(searchParams.available ? { available: searchParams.available } : {}),
            ...(searchParams.sort ? { sort: searchParams.sort } : {}),
            page: (i + 1).toString(),
          };

          return (
            <Link
              key={i}
              href={{ pathname: '/', query }}
              className={i + 1 === page ? 'active' : ''}
            >
              {i + 1}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
