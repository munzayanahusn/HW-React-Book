import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        console.log("GET A BOOK", response);
        setBook(response);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  console.log("GET A BOOK", book);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="bg-gray-200 h-72 my-6 animate-pulse"></div>
      ) : (
        <div className="my-6 flex">
          <div className="w-1/3">
            <img
              src={`http://localhost:8000/${book.image}`}
              alt={book.title}
            />
          </div>
          <div className="ml-8">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-xl font-semibold text-gray-500">{book.author}</p>
            <p className="text-xl font-semibold text-gray-500">{book.publisher}</p>
            <p className="text-xl font-semibold text-gray-500 mb-4">{book.year} | {book.pages} pages</p>
          </div>
        </div>
      )}
      {localStorage.getItem('token') && (localStorage.getItem('isLogIn') == "true") && (
        <div className="flex space-x-4">
          <div className="relative">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleDeleteBook}>Delete</button>
            <div className="absolute -right-20 top-10 w-48 bg-white border border-gray-200 p-4 rounded shadow-md hidden">
              <p className="font-semibold">Confirmation!</p>
              <p>Are you sure you want to delete this book?</p>
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-2" onClick={handleDeleteBook}>Delete</button>
            </div>
          </div>
          <Link to={`/editbook/${id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Edit</button>
          </Link>
        </div>
      )}
    </div>
  );
}