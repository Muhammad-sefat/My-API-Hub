"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

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
        <SidebarLink
          href="/dashboard/weather"
          icon={<FaCloudSun className="text-yellow-300" />}
          label="Weather"
          pathname={pathname}
        />
        <SidebarLink
          href="/dashboard/chatboat"
          icon={<FaRobot className="text-blue-400" />}
          label="AI Chatbot"
          pathname={pathname}
        />
        <SidebarLink
          href="/dashboard/currency"
          icon={<FaDollarSign className="text-green-400" />}
          label="Currency Exchange"
          pathname={pathname}
        />
        <SidebarLink
          href="/dashboard/movies"
          icon={<FaFilm className="text-red-400" />}
          label="Movie Data"
          pathname={pathname}
        />
        <SidebarLink
          href="/dashboard/map"
          icon={<FaMapMarkedAlt className="text-purple-400" />}
          label="Map & Location"
          pathname={pathname}
        />
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

// Sidebar Link Component
function SidebarLink({ href, icon, label, pathname }) {
  const isActive = pathname === href;
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center space-x-3 text-lg p-3 rounded-lg transition ${
          isActive ? "bg-gray-700 text-yellow-300" : "hover:bg-gray-800"
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
}
