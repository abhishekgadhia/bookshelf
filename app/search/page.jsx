"use client";

import { useState } from "react";
import Link from "next/link";
import { searchBooks } from "../../lib/openlibrary";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    const books = await searchBooks(query);
    setResults(books);
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="text-2xl font-semibold">Search Books</h2>

      <form onSubmit={handleSearch} className="mt-6 flex gap-3">
        <input
          className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Try: Harry Potter, Atomic Habits, Tolkien..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">
          Search
        </button>
      </form>

      {loading && <p className="mt-6 text-neutral-600">Searching...</p>}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {results.map((book) => (
          <Link
            key={book.id}
            href={`/book/${encodeURIComponent(book.id)}`}
            className="rounded-2xl border border-neutral-200 p-4 hover:shadow"
          >
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                className="mb-3 h-48 w-full rounded-xl object-cover"
              />
            ) : (
              <div className="mb-3 h-48 w-full rounded-xl bg-neutral-200" />
            )}

            <h3 className="font-semibold">{book.title}</h3>
            <p className="text-sm text-neutral-600">{book.author}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}