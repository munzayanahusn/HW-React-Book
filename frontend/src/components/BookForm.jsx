import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch";

export default function BookForm({ bookData }) {
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }
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
        alert("Book updated successfully");
      } catch (error) {
        alert(error.response.data.message || "Something went wrong");
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      alert("Book created successfully");
      setSelectedImage("");
    } catch (error) {
      alert(error.response.data.message || "Something went wrong");
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <label>
          Title
          <input
            name="title"
            required
            defaultValue={bookData?.title}
            className="border border-gray-300 p-2 rounded"
          />
        </label>
        <label>
          Author
          <input
            name="author"
            required
            defaultValue={bookData?.author}
            className="border border-gray-300 p-2 rounded"
          />
        </label>
        <label>
          Publisher
          <input
            name="publisher"
            required
            defaultValue={bookData?.publisher}
            className="border border-gray-300 p-2 rounded"
          />
        </label>
        <label>
          Year
          <input
            name="year"
            type="number"
            required
            defaultValue={bookData?.year}
            className="border border-gray-300 p-2 rounded"
          />
        </label>
        <label>
          Pages
          <input
            name="pages"
            type="number"
            required
            defaultValue={bookData?.pages}
            className="border border-gray-300 p-2 rounded"
          />
        </label>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Image"
            className="w-64 object-cover rounded"
          />
        )}
        {!bookData?.image && (
          <label>
            Image
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
          </label>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {bookData ? "Edit Book" : "Create Book"}
      </button>
    </form>
  );
}
