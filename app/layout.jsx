import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../lib/AuthContext";

export const metadata = {
  title: "BookShelf",
  description: "Search, save, and track your reading.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}