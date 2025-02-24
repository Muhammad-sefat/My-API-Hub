"use client";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Register Error:", error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Google Register Error:", error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Register Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white shadow-lg px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Create an Account
        </h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full max-w-md p-3 border rounded-lg mb-3"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full max-w-md p-3 border rounded-lg mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full max-w-md p-3 border rounded-lg mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg mb-3"
        >
          Register
        </button>
        <button
          onClick={handleGoogleRegister}
          className="w-full max-w-md flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg mb-4 border"
        >
          <FcGoogle className="text-2xl mr-2" />
          Register with Google
        </button>
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Right Side - Design Element */}
      <div className="w-1/2 bg-gradient-to-br from-green-500 to-teal-600 flex justify-center items-center text-white text-3xl font-bold">
        <p>Join & Start Experimenting with APIs 🚀</p>
      </div>
    </div>
  );
}
