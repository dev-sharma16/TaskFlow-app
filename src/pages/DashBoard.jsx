import React from "react";

function Dashboard() {
  return (
    <section className="px-4 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Task Board 📋</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">Task #{item}</h2>
            <p className="text-gray-600 mb-4">
              This is a placeholder for your task content. You can add title,
              description, deadline etc.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
