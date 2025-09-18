import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BACKEND_URL = "https://backend-oauth-implement.onrender.com";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // ✅ Check token in URL after Google redirect
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      // Clean URL query params
      navigate("/dashboard", { replace: true });
    } else {
      // Agar URL me token nahi, to localStorage se try karo
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        // Token invalid ya expired
        handleLogout();
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error("❌ Error fetching user:", err);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/", { replace: true });
  };

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100">
        <h2 className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 max-w-md w-full text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6">
          {user.name?.charAt(0) ?? "?"}
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-2">
          Welcome, <span className="font-medium text-gray-900">{user.name}</span>
        </p>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">{user.email}</p>
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
