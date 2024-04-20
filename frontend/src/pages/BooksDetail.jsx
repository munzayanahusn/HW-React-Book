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
    <div className="flex flex-col items-center justify-center">
      {isLoading ? (
        <div className="bg-gray-200 h-72 my-6 animate-pulse"></div>
      ) : (
        <div className="my-6 flex flex-col items-center">
          <div className="mt-5">
            <h1 className="text-4xl font-bold text-slate-500 mb-10">Detail Book</h1>
          </div>
          <div className="w-full">
            <img
              src={`http://localhost:8000/${book.image}`}
              alt={book.title}
              style={{ width: '500px', height: '300px' }} 
            />
          </div>
          <div className="mt-5">
            <h1 className="text-2xl font-bold text-slate-800 mb-5">{book.title}</h1>
            <p className="text-xl font-semibold text-gray-500">Author : {book.author}</p>
            <p className="text-xl font-semibold text-gray-500">Publisher : {book.publisher}</p>
            <p className="text-xl font-semibold text-gray-500">Year : {book.year}</p>
            <p className="text-xl font-semibold text-gray-500 mb-4">Number of Pages : {book.pages} pages</p>
          </div>
        </div>
      )}
      {localStorage.getItem('token') && (localStorage.getItem('isLogIn') == "true") && (
        <div className="flex space-x-4 mt-4">
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