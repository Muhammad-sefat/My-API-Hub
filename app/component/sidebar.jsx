"use client";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  return (
    <div className="w-60 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li>
          <Link href="/dashboard/weather">Weather</Link>
        </li>
        <li>
          <Link href="/dashboard/chatbot">AI Chatbot</Link>
        </li>
        <li>
          <Link href="/dashboard/currency">Currency Exchange</Link>
        </li>
        <li>
          <Link href="/dashboard/movies">Movie Data</Link>
        </li>
        <li>
          <Link href="/dashboard/map">Map & Location</Link>
        </li>
      </ul>
      <button onClick={handleLogout} className="mt-4 bg-red-500 px-4 py-2">
        Logout
      </button>
    </div>
  );
}
