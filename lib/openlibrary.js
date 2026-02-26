// Purpose:
// This file handles communication with the Open Library API.
// It provides functions to search for books and retrieve
// detailed book information.
export async function searchBooks(query) {
    if (!query) return [];
  
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
  
    return data.docs.slice(0, 20).map((b) => ({
      id: b.key, // "/works/OLxxxxW"
      title: b.title,
      author: b.author_name?.[0] || "Unknown",
      cover: b.cover_i
        ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
        : null,
    }));
  }
  
  export async function getWork(workKey) {
    // workKey should look like "/works/OL123W"
    const clean = workKey?.startsWith("/") ? workKey : `/${workKey}`;
    const res = await fetch(`https://openlibrary.org${clean}.json`);
    if (!res.ok) throw new Error("Failed to load Open Library work details");
    return res.json();
  }