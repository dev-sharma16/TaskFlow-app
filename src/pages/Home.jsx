import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl bg-white p-10 rounded-2xl shadow-lg border border-gray-200 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">TaskFlow..!</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your personal task manager to stay organized, boost productivity,
          and never miss a deadline. Sign up now and start managing your tasks effortlessly.
        </p>

        <Link
          to="/signup"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
