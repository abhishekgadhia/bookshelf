"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getWork } from "../../../lib/openlibrary";
import { getWikipediaSummary } from "../../../lib/mediawiki";
import { addToShelf } from "../../../lib/shelf";
import { useAuth } from "../../../lib/AuthContext";
import Link from "next/link";

export default function BookDetailsPage() {
  const params = useParams();
  const idRaw = params?.id;
  const workKey = idRaw ? decodeURIComponent(idRaw) : "";

  const { user, loadingUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState(null);
  const [wiki, setWiki] = useState(null);
  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    if (!workKey) return;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        setSavedMsg("");

        const w = await getWork(workKey);
        if (cancelled) return;
        setWork(w);

        const wikiResult = await getWikipediaSummary(w.title);
        if (cancelled) return;
        setWiki(wikiResult);

        setLoading(false);
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || "Something went wrong.");
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [workKey]);

  const coverId = work?.covers?.[0] ?? null;
  const coverLarge = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null;

  const coverMed = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;

  const description =
    typeof work?.description === "string"
      ? work.description
      : work?.description?.value || "";

    async function handleSave() {
    setSavedMsg("");
    
    if (!user) {
        setSavedMsg("Please sign in to save books.");
        return;
    }
    
    try {
        setSaving(true);
    
        const bookToSave = {
        id: workKey,
        title: work?.title || "Untitled",
        cover: coverMed,
        };
    
        console.log("Saving to Firestore:", user.uid, bookToSave);
    
        await addToShelf(user.uid, bookToSave);
    
        setSavedMsg("Saved to your shelf ✅");
    } catch (e) {
        console.error("Save error:", e);
        setSavedMsg(e?.message || "Failed to save.");
    } finally {
        setSaving(false);
    }
    }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {!workKey ? (
        <p className="text-neutral-600">Missing book id.</p>
      ) : loading ? (
        <p className="text-neutral-600">Loading book details...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-[220px_1fr]">
            <div>
              {coverLarge ? (
                <img
                  src={coverLarge}
                  alt={work.title}
                  className="w-full rounded-2xl border object-cover"
                />
              ) : (
                <div className="h-72 w-full rounded-2xl border bg-neutral-200" />
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold">{work.title}</h1>
              <p className="mt-2 text-sm text-neutral-600">
                Open Library ID: {workKey}
              </p>

              {/* ADD TO SHELF BUTTON */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving || loadingUser}
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Add to Shelf"}
                </button>

                {!user && !loadingUser && (
                  <Link
                    href="/auth/signin"
                    className="text-sm text-emerald-700 underline"
                  >
                    Sign in to save
                  </Link>
                )}

                {savedMsg && (
                  <span className="text-sm text-neutral-700">{savedMsg}</span>
                )}
              </div>

              {description ? (
                <p className="mt-5 leading-relaxed text-neutral-800">
                  {description}
                </p>
              ) : (
                <p className="mt-5 text-neutral-600">No description available.</p>
              )}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-neutral-200 p-5">
            <p className="font-semibold">Related info (Wikipedia)</p>
            {wiki?.extract ? (
              <>
                <p className="mt-2 text-neutral-700">{wiki.extract}</p>
                {wiki.url && (
                  <a
                    className="mt-3 inline-block text-emerald-700 underline"
                    href={wiki.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read more on Wikipedia
                  </a>
                )}
              </>
            ) : (
              <p className="mt-2 text-neutral-600">No Wikipedia summary found.</p>
            )}
          </div>
        </>
      )}
    </main>
  );
}