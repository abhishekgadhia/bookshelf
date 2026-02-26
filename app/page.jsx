// Purpose:
// This is the landing page of the BookShelf application.
// It introduces the app and allows users to navigate to search,
// view their shelf, or sign in to their account.
"use client";

import Link from "next/link";
import { useAuth } from "../lib/AuthContext";

export default function HomePage() {
  const { user, loadingUser } = useAuth();

  return (
    <main className="min-h-screen">
      {/* subtle brand background */}
      <div className="bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* HERO */}
          <div className="rounded-3xl border border-emerald-100 bg-white p-10 shadow-sm">
            <p className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              BookShelf • Save what you find
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Your personal <span className="text-emerald-700">BookShelf</span>
            </h1>

            <p className="mt-4 max-w-2xl text-neutral-600">
              Search books, save them to your shelf, and keep your reading list
              organized with a clean, simple flow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/search"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-[0.99]"
              >
                Start searching
              </Link>

              <Link
                href="/shelf"
                className="rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 active:scale-[0.99]"
              >
                View my shelf
              </Link>

              {!loadingUser && !user && (
                <Link
                  href="/auth/signin"
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 active:scale-[0.99]"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>

          {/* FEATURES */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Search"
              desc="Find books by title or author using Open Library."
              icon="🔎"
            />
            <FeatureCard
              title="Save"
              desc="Add books to your shelf with one click."
              icon="📚"
            />
            <FeatureCard
              title="Track"
              desc="Keep your list organized and easy to revisit."
              icon="✅"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-lg">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-neutral-900">{title}</h3>
          <p className="mt-1 text-sm text-neutral-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}