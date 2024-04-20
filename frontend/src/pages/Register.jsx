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
      alert("You have successfully registered. Please Login To Continue");
      navigate("/");
    } catch (e) {
      setError(e.message || "An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="w-full py-4 px-24 mx-auto mt-8 style={{ width: '2000px' }}">
      <h1 className="text-3xl text-slate-900 font-bold mb-4">Account Registration</h1>

      <div className="border-2 border-gray-200 rounded-lg p-4">
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex mb-4 items-center">
          <label htmlFor="name" className="block text-slate-700 text-left mr-4" style={{ width: '150px' }}>Name</label>
          <p className="text-slate-700 mr-2">:</p>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="bg-white border border-gray-300 rounded p-2 w-full "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>

        <div className="flex mb-4 items-center">
          <label htmlFor="email" className="block text-slate-700 text-left mr-4" style={{ width: '150px' }}>Email</label>
          <p className="text-slate-700 mr-2">:</p>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            className="bg-white border border-gray-300 rounded p-2 w-full "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>

        <div className="flex mb-4 items-center">
          <label htmlFor="password" className="block text-slate-700 text-left mr-4" style={{ width: '150px' }}>Password</label>
          <p className="text-slate-700 mr-2">:</p>
          <input
            type="password"
            id="password"
            placeholder="Enter a password"
            className="bg-white border border-gray-300 rounded p-2 w-full "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="confirmPassword" className="block text-left text-slate-700 mr-4" style={{ width: '150px' }}>Confirm Password</label>
          <p className="text-slate-700 mr-2">:</p>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            className={`bg-white border border-gray-300 rounded p-2 w-full  ${password !== confirmPassword && 'border-red-500'}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>
        {password !== confirmPassword && (
          <p className="text-xs text-red-500 text-left ml-40 mt-2 mb-4">The password does not match</p>
        )}

        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mr-5 rounded" type="submit">Register</button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Register;
