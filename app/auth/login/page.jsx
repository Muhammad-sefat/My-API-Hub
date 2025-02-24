"use client";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white shadow-lg px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back</h2>
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
          onClick={handleLogin}
          className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mb-3"
        >
          Login
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full max-w-md flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg mb-4 border"
        >
          <FcGoogle className="text-2xl mr-2" />
          Login with Google
        </button>
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Right Side - Design Element */}
      <div className="w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center text-white text-3xl font-bold">
        <p>Explore APIs & Build Amazing Apps 🚀</p>
      </div>
    </div>
  );
}
