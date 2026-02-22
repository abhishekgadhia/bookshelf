"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import { db } from "../../lib/firebase";
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from "firebase/firestore";

export default function ShelfPage() {
  const router = useRouter();
  const { user, loadingUser } = useAuth();

  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loadingShelf, setLoadingShelf] = useState(true);

  useEffect(() => {
    if (loadingUser) return;

    // ✅ Protected UX: redirect if not logged in
    if (!user) {
      router.push("/auth/signin");
      return;
    }

    setErr("");
    setLoadingShelf(true);

    const q = query(
      collection(db, "users", user.uid, "shelf"),
      orderBy("savedAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => d.data());
        setItems(data);
        setLoadingShelf(false);
      },
      (e) => {
        setErr(e.message || "Failed to load shelf.");
        setLoadingShelf(false);
      }
    );

    return () => unsub();
  }, [user, loadingUser, router]);

  async function handleRemove(bookId) {
    if (!user) return;
    const safeId = encodeURIComponent(bookId);
    await deleteDoc(doc(db, "users", user.uid, "shelf", safeId));
  }

  // While auth state is loading, show loading
  if (loadingUser) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-neutral-600">Loading...</p>
      </main>
    );
  }

  // While redirect is happening, show a friendly message (prevents blank screen)
  if (!user) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-2xl font-semibold">My Shelf</h2>
        <p className="mt-2 text-neutral-700">
          Redirecting you to sign in...
        </p>
        <Link
          href="/auth/signin"
          className="mt-4 inline-block rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
        >
          Sign In
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="text-2xl font-semibold">My Shelf</h2>
      <p className="mt-2 text-neutral-600">
        Signed in as <span className="text-neutral-800">{user.email}</span>
      </p>

      {err && <p className="mt-4 text-sm text-red-600">{err}</p>}

      {loadingShelf ? (
        <p className="mt-6 text-neutral-600">Loading shelf...</p>
      ) : items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="text-neutral-600">No saved books yet.</p>
          <Link className="mt-3 inline-block underline" href="/search">
            Go search some books →
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-neutral-200 bg-white p-4"
            >
              {b.cover ? (
                <img
                  src={b.cover}
                  alt={b.title}
                  className="mb-3 h-48 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="mb-3 h-48 w-full rounded-xl bg-neutral-200" />
              )}

              <h3 className="font-semibold">{b.title}</h3>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/book/${encodeURIComponent(b.id)}`}
                  className="text-sm text-emerald-700 underline"
                >
                  View
                </Link>
                <button
                  onClick={() => handleRemove(b.id)}
                  className="text-sm text-red-600 underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}