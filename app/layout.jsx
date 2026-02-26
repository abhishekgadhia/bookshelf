// app/layout.jsx
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
      <body className="text-neutral-900">
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
