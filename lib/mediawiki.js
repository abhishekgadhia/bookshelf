// Purpose:
// This file connects to the Wikipedia API to fetch summaries
// related to books displayed in the application.
export async function getWikipediaSummary(title) {
    if (!title) return null;
  
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      title
    )}`;
  
    const res = await fetch(url);
    if (!res.ok) return null;
  
    const data = await res.json();
  
    return {
      title: data.title,
      extract: data.extract,
      url: data.content_urls?.desktop?.page || null,
    };
  }