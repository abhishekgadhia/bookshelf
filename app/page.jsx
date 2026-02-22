import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Your personal BookShelf</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-700">
        Search books, save them to your shelf, and track progress with private notes.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/search"
          className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
        >
          Start searching
        </Link>
        <Link
          href="/shelf"
          className="rounded-xl border border-neutral-300 bg-white px-5 py-3 hover:bg-neutral-50"
        >
          View my shelf
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="font-semibold">🔍 Search</p>
          <p className="mt-1 text-sm text-neutral-700">Find books by title or author.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="font-semibold">📚 Save</p>
          <p className="mt-1 text-sm text-neutral-700">Add books to your shelf.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="font-semibold">📝 Track</p>
          <p className="mt-1 text-sm text-neutral-700">Notes + progress while reading.</p>
        </div>
      </div>
    </main>
  );
}