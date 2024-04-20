import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../modules/fetch";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(name, email, password);
      alert("You have successfully registered.");
      navigate("/");
    } catch (e) {
      setError(e.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full py-4 px-24 mx-auto mt-8">
      <h1 className="text-xl font-bold mb-4">Register</h1>

      <div className="border-2 border-gray-200 rounded-lg p-4">
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-4">
            <label htmlFor="name" className="block">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="border border-gray-300 rounded p-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="border border-gray-300 rounded p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter a password"
              className="border border-gray-300 rounded p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className={`border border-gray-300 rounded p-2 w-full ${password !== confirmPassword && 'border-red-500'}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {password !== confirmPassword && (
              <p className="text-xs text-red-500">The password does not match</p>
            )}
          </div>

          <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;