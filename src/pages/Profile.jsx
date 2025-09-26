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

  // Loader shown while user data is not yet loaded or during logout
  if (user === null || loading) return <ModernLoader />;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <img
        src={user.picture}
        alt={user?.name || "profile"}
        className="rounded-full w-32 h-32 mb-4 object-cover shadow-lg"
        referrerPolicy="no-referrer"
      />
      <h2 className="text-xl font-semibold">{user?.name}</h2>
      <p className="text-gray-600 mb-2">{user?.email}</p>

      {/* Role-based message */}
      {user.role && (
        <p className={`mb-6 text-sm font-medium ${
          user.role === "seller" ? "text-red-500" : "text-blue-500"
        }`}>
          You are a {user.role}
        </p>
      )}

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;

