import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginBool = window.localStorage.getItem("isLogIn");
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogin(loginBool === "true");
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleLogout = () => {
    window.localStorage.setItem("isLogIn", false);
    setIsLogin(false);
    
    window.location.reload(); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(e.target.email.value, e.target.password.value);
      window.localStorage.setItem("token", token.token);
      window.localStorage.setItem("isLogIn", true);
      setIsLogin(true);
      handleClose();

      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  console.log("isLogin", isLogin);

  return (
    <nav className="flex justify-between items-center bg-slate-800 text-black p-4">
      <Link to="/" className="cursor-pointer flex">
        <img src="/online-lib.svg" alt="Online Library" className="h-8 mr-5" />
        <h1 className="text-xl font-bold">Online Library</h1>
      </Link>
      <div className="flex space-x-4">
        {isLogin && (
          <Link to="/newbook">
            <button className="bg-gray-800 text-white py-2 px-4 rounded">Create New Book</button>
          </Link>
        )}
        {!isLogin ? (
          <button onClick={handleOpen} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Login</button>
        ) : (
          <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Logout</button>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">Login</h2>
              <button onClick={handleClose} className="text-gray-500 bg-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleLogin} className="mb-4">
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded p-2 bg-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded p-2 bg-white"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Login</button>
            </form>
            <Link to="/register" onClick={handleClose} className="text-blue-500 hover:underline">Doesn't Have an Account? Click here</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;