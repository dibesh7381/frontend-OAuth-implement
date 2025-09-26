import { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:5000";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    const res = await fetch(`${BACKEND_URL}/profile`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data); // Check data in console
    if (res.ok) {
      setUser(data.user);
    } else {
      window.location.href = "/login";
    }
  };

  const handleLogout = async () => {
    await fetch(`${BACKEND_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

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
      <p className="text-gray-600 mb-6">{user?.email}</p>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

