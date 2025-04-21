import React from "react";
import { SignUp as SignUpComponent } from "../components";

export default function SignUp() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign up for <span className="text-blue-600">TaskFlow</span>
        </h2>
        <SignUpComponent />
      </div>
    </section>
  );
}
