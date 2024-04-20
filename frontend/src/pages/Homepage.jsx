import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";

export default function Homepage() {
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogOut, setIsLogOut] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();

    const token = window.localStorage.getItem("token");
    const loginBool = window.localStorage.getItem("isLogIn");
    if (token) {
      setIsLoggedIn(true);
      setIsLogOut(loginBool === "false");
    } else {
      setIsLoggedIn(false);
      setIsLogOut(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="text-md text-center text-slate-700 font-bold mt-10 mb-5">
        <h1>Welcome to the Online Library</h1>
      </div>
      {!isLoggedIn && (
        <div className="text-center text-amber-700 mb-5">
          <p>Please Login or Register First to Start Reading</p>
        </div>
      )}

      {isLoggedIn && isLogOut && (
        <div className="text-center text-amber-700 mb-5">
          <p>You have been logged out. Please Login Again to Add or Edit Book</p>
        </div>
      )}

      {isLoggedIn && (books.length === 0) && (
        <div className="text-center text-slate-500 text-bold mb-5">
          <p>No books available</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 l:grid-cols-4 gap-4">
        {isLoggedIn && books.length > 0 && books.map((book) => (
          <Books key={`${book.id} ${book.title}`} {...book} />
        ))}
      </div>
    </div>
  );
}