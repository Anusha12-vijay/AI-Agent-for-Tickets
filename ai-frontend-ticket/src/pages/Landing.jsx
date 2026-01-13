// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      {/* Glass Card */}
      <div className="max-w-2xl w-full text-center p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        
        {/* Badge */}
        <div className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
          🚀 AI-Powered Support
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Welcome to <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            AI Ticket Assistant
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg mb-8">
          Your smart, automated solution for managing, assigning, and resolving
          tickets — faster than ever.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/signup")}
          className="btn btn-lg rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white px-10 shadow-lg hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300"
        >
          Let’s Resolve ⚡
        </button>

        {/* Footer text */}
        <p className="mt-6 text-sm text-gray-500">
          Built for developers • Teams • Enterprises
        </p>
      </div>
    </div>
  );
};

export default Landing;
