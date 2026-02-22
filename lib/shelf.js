import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// WRITE: save a book to user's shelf
export async function addToShelf(uid, book) {
  const safeId = encodeURIComponent(book.id);
  const ref = doc(db, "users", uid, "shelf", safeId);

  await setDoc(ref, {
    ...book,
    savedAt: Date.now(),
  });
}

// READ: load all saved books
export async function getShelf(uid) {
  const ref = collection(db, "users", uid, "shelf");
  const snap = await getDocs(ref);

  const items = snap.docs.map((d) => d.data());
  items.sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
  return items;
}

// DELETE (optional)
export async function removeFromShelf(uid, bookId) {
  const safeId = encodeURIComponent(bookId);
  const ref = doc(db, "users", uid, "shelf", safeId);
  await deleteDoc(ref);
}