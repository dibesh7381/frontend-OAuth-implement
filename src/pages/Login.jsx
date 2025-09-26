const BACKEND_URL = "http://localhost:5000";

const Login = () => {
  const handleGoogleLogin = () => {
    window.open(`${BACKEND_URL}/auth/google`, "_self");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login with Google</h1>
      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center space-x-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="white" d="M21.35 11.1h-9.17v2.85h5.46c-.24 1.45-1.58 4.27-5.46 4.27-3.29 0-5.97-2.72-5.97-6.08S8.59 5.5 11.88 5.5c1.88 0 3.14.81 3.86 1.5l2.64-2.55C16.28 2.97 14.34 2 11.88 2 6.38 2 2 6.48 2 12s4.38 10 9.88 10c5.7 0 9.46-4 9.46-9.62 0-.64-.07-1.13-.99-1.28z"/>
        </svg>
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default Login;
