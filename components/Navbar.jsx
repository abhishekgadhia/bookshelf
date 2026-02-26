"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../lib/AuthContext";

export default function Navbar() {
  const { user, loadingUser, logout } = useAuth();

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
      <Link href="/" className="flex items-center">
  <Image
    src="/logo.png"
    alt="BookShelf Logo"
    width={140}
    height={50}
    priority
  />
</Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/search" className="text-neutral-700 hover:text-emerald-700">
            Search
          </Link>
          <Link href="/shelf" className="text-neutral-700 hover:text-emerald-700">
            My Shelf
          </Link>

          {loadingUser ? null : user ? (
            <>
              <span className="hidden sm:inline text-neutral-600">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="rounded-lg border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}