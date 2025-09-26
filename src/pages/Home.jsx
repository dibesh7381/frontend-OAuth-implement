import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Welcome to MERN Google OAuth App</h1>
      <p className="mb-6">A simple authentication app using Google OAuth, JWT, and Tailwind CSS</p>
      <div className="space-x-4">
        <Link to="/login">
          <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Login
          </button>
        </Link>
        <Link to="/dashboard">
          <button className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
