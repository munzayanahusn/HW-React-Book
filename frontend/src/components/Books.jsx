import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`} className="block my-4 p-4 cursor-pointer shadow-md hover:shadow-lg rounded-lg border border-gray-200 bg-gray-100 transition duration-300 flex items-start" style={{ width: '300px' }}>
      <div className="flex items-center space-x-4">
        <img
          src={`http://localhost:8000/${image}`}
          alt={title}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800" style={{ textAlign: 'left' }}>
            {title} ({year})
          </h2>
          <p className="text-sm text-gray-600" style={{ textAlign: 'left' }}>{author}</p>
          <p className="text-sm text-gray-600" style={{ textAlign: 'left' }}>
            <span className="font-medium">Publisher: </span>
            {publisher}
          </p>
        </div>
      </div>
    </Link>
  );
}