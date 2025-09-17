import React from "react";

const BACKEND_URL = "https://backend-oauth-implement.onrender.com";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-10 w-full max-w-sm mx-auto flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
          Welcome to Google OAuth Demo
        </h1>
        <p className="text-blue-600 mb-6 text-center text-sm sm:text-base px-2">
          Click the button below to login with your Google account
        </p>
        <a
          href={`${BACKEND_URL}/auth/google`}
          className="w-full text-center bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Login with Google
        </a>
      </div>
    </div>
  );
};

export default Home;

