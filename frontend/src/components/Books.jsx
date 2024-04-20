import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`} className="block my-4 p-4 cursor-pointer">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">
          {title} ({year})
        </h2>
        <p>{author}</p>
        <img
          src={`http://localhost:8000/${image}`}
          alt={title}
          className="w-24 h-24 object-cover"
        />
        <p>
          <span className="font-medium">Publisher: </span>
          {publisher}
        </p>
      </div>
    </Link>
  );
}