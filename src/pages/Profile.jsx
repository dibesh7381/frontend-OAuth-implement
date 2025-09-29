import ModernLoader from "../components/ModernLoader";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    navigate("/"); // redirect to home after logout
  };

  if (user === null || loading) return <ModernLoader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 w-full max-w-sm flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <img
          src={user.picture}
          alt={user?.name || "profile"}
          className="rounded-full w-32 h-32 mb-4 object-cover shadow-md"
          referrerPolicy="no-referrer"
        />
        <h2 className="text-xl font-semibold">{user?.name}</h2>
        <p className="text-gray-600 mb-2">{user?.email}</p>

        {user.role && (
          <p
            className={`mb-6 text-sm font-medium ${
              user.role === "seller" ? "text-red-500" : "text-blue-500"
            }`}
          >
            You are a {user.role}
          </p>
        )}

        <button
          onClick={handleLogout}
          className="px-6 py-3 cursor-pointer bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
