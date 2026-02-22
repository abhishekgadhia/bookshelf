"use client";

import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignin(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/search");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-10">
      <h2 className="text-2xl font-semibold">Sign In</h2>

      <form onSubmit={handleSignin} className="mt-6 rounded-2xl border bg-white p-5">
        <input
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mt-3 w-full rounded-xl border px-4 py-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}

        <button
          disabled={loading}
          className="mt-4 w-full rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="mt-4 text-sm text-neutral-700">
          No account?{" "}
          <Link className="text-emerald-700 underline" href="/auth/signup">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}