"use client";

import Link from "next/link";
import { useAuth } from "../lib/AuthContext";

export default function Navbar() {
  const { user, loadingUser, logout } = useAuth();

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        backdrop-blur-md
        bg-gradient-to-b from-white/60 to-white/20
        border-b border-white/20
      "
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="BookShelf"
            className="h-16 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">

          <Link
            href="/search"
            className="text-neutral-700 transition hover:text-emerald-700"
          >
            Search
          </Link>

          <Link
            href="/shelf"
            className="text-neutral-700 transition hover:text-emerald-700"
          >
            My Shelf
          </Link>

          {loadingUser ? null : user ? (
            <>
              <span className="hidden sm:inline text-neutral-600">
                {user.email}
              </span>

              <button
                onClick={logout}
                className="
                  rounded-lg
                  border border-neutral-300/60
                  px-4 py-2
                  transition
                  hover:bg-white/50
                "
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="
                rounded-lg
                bg-emerald-600
                px-4 py-2
                text-white
                transition
                hover:bg-emerald-700
              "
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}