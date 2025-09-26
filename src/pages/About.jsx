import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Page content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          About Us
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Welcome to our application! This is the About page. Here you can
          provide information about your app, your team, or anything you want
          your users to know. It's fully responsive and works on mobile and
          desktop.
        </p>
      </main>
    </div>
  );
};

export default About;
