import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to MERN Google OAuth App
        </h1>
        <p className="text-gray-600 max-w-xl">
          A simple authentication app using Google OAuth, JWT, and Tailwind CSS. Fully responsive and modern UI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
        </div>
      </main>
    </div>
  );
};

export default Home;
