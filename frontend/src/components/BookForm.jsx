import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch";
import { useNavigate } from "react-router-dom";

export default function BookForm({ bookData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false); // State untuk menandai apakah submit dilakukan
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true); // Set submit ke true saat submit dilakukan
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        navigate(`/books/${bookData.id}`);
        alert("Book updated successfully");
      } catch (error) {
        alert(error.response.data.message || "Something went wrong");
      }
    } else {
      try {
        await createBook(formData);
        event.target.reset();
        navigate(`/`);
        alert("Book created successfully");
        setSelectedImage("");
      } catch (error) {
        alert(error.response.data.message || "Something went wrong");
      }
    }
    setSubmitting(false); // Set submit kembali ke false setelah selesai submit
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  const handleCancel = () => {
    if (bookData) {
      navigate(`/books/${bookData.id}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div className="w-full py-4 px-24 mx-auto mt-8">
      <h1 className="text-3xl text-slate-900 font-bold mb-4">{bookData ? "Edit Book" : "Create New Book"}</h1>

      <div className="border-2 border-gray-200 rounded-lg p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex mb-4 items-center">
            <label className="block text-slate-700 text-left mr-4" style={{ width: '150px' }}>
              Title
            </label>
            <p className="text-slate-700 mr-2">:</p>
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter book title"
                required={submitting} 
                defaultValue={bookData?.title}
                className="bg-white border border-gray-300 rounded p-2 w-full"
                style={{ color: 'black' }}
            />
          </div>
          <div className="flex mb-4 items-center">
            <label className="block text-slate-700 text-left mr-4" style={{ width: '150px' }}>
              Author
            </label>
            <p className="text-slate-700 mr-2">:</p>
            <input
                type="text"
                id="author"
                name="author"
                placeholder="Enter book author"
                required={submitting} 
                defaultValue={bookData?.author}
                className="bg-white border border-gray-300 rounded p-2 w-full"
                style={{ color: 'black' }}
            />
          </div>
          <div className="flex mb-4 items-center">
            <label className="block text-slate-700 text-left mr-4" style={{ width: '150px' }}>
              Publisher
            </label>
            <p className="text-slate-700 mr-2">:</p>
            <input
                type="text"
                id="publisher"
                name="publisher"
                placeholder="Enter book publisher"
                required={submitting} 
                defaultValue={bookData?.publisher}
                className="bg-white border border-gray-300 rounded p-2 w-full"
                style={{ color: 'black' }}
            />
          </div>
          <div className="flex mb-4 items-center">
            <label className="block text-slate-700 text-left mr-4" style={{ width: '150px' }}>
              Year
            </label>
            <p className="text-slate-700 mr-2">:</p>
            <input
                type="number"
                id="year"
                name="year"
                placeholder="Enter book year publication"
                required={submitting} 
                defaultValue={bookData?.year}
                className="bg-white border border-gray-300 rounded p-2 w-full"
                style={{ color: 'black' }}
            />
          </div>
          <div className="flex mb-4 items-center">
            <label className="block text-slate-700 text-left mr-4" style={{ width: '150px' }}>
              Number of Pages
            </label>
            <p className="text-slate-700 mr-2">:</p>
            <input
                type="number"
                id="pages"
                name="pages"
                placeholder="Enter book number of pages"
                required={submitting} 
                defaultValue={bookData?.pages}
                className="bg-white border border-gray-300 rounded p-2 w-full"
                style={{ color: 'black' }}
            />
          </div>
          {!bookData?.image && (
            <div className="flex mb-4 items-center">
              <label className="block text-slate-700 text-left mr-4" style={{ width: '130px' }}>
                Image
              </label>
              <p className="text-slate-700 mr-2">:</p>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                }}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
          )}
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected Image"
              className="w-64 border border-black object-cover rounded ml-40"
            />
          )}
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mr-5 rounded" type="submit">{bookData ? "Edit Book" : "Create Book"}</button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}