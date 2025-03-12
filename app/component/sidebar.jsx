"use client";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { useRouter } from "next/navigation";
import {
  FaCloudSun,
  FaRobot,
  FaDollarSign,
  FaFilm,
  FaMapMarkedAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-5 shadow-lg">
      {/* Dashboard Title */}
      <h2 className="text-2xl font-semibold text-center mb-6">My_API_Hub</h2>

      {/* Navigation Links */}
      <ul className="space-y-4">
        <li>
          <Link
            href="/dashboard/weather"
            className="flex items-center space-x-3 text-lg hover:bg-gray-800 p-3 rounded-lg transition"
          >
            <FaCloudSun className="text-yellow-300" />
            <span>Weather</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/chatboat"
            className="flex items-center space-x-3 text-lg hover:bg-gray-800 p-3 rounded-lg transition"
          >
            <FaRobot className="text-blue-400" />
            <span>AI Chatbot</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/currency"
            className="flex items-center space-x-3 text-lg hover:bg-gray-800 p-3 rounded-lg transition"
          >
            <FaDollarSign className="text-green-400" />
            <span>Currency Exchange</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/movies"
            className="flex items-center space-x-3 text-lg hover:bg-gray-800 p-3 rounded-lg transition"
          >
            <FaFilm className="text-red-400" />
            <span>Movie Data</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/map"
            className="flex items-center space-x-3 text-lg hover:bg-gray-800 p-3 rounded-lg transition"
          >
            <FaMapMarkedAlt className="text-purple-400" />
            <span>Map & Location</span>
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 hover:bg-red-600 text-white flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
}
