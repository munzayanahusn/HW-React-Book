import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false); 
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading ? (
        <div className="bg-gray-200 h-72 my-6 animate-pulse"></div>
      ) : (
        <div className="my-6 flex flex-col items-center">
          <div className="mt-5">
            <h1 className="text-4xl font-bold text-slate-500 mb-10">Book's Detail</h1>
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
      {(!localStorage.getItem('token') || (localStorage.getItem('isLogIn') == "false")) && (
        <div className="text-center text-amber-700 mt-10">
          <p>You need to log in to edit or delete the book.</p>
        </div>
      )}
      {localStorage.getItem('token') && (localStorage.getItem('isLogIn') == "true") && (
        <div className="flex space-x-4 mt-4">
          <div className="relative">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleDeleteBook}>Delete</button>
            {showConfirmation && (
              <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-3xl text-black font-bold mb-4">Delete Book</h2>
                  <p className="text-lg text-gray-800 mb-8">Are you sure you want to delete this book?</p>
                  <div className="flex justify-center">
                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2" onClick={confirmDelete}>Delete</button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded" onClick={cancelDelete}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link to={`/editbook/${id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Edit</button>
          </Link>
        </div>
      )}
    </div>
  );
}
