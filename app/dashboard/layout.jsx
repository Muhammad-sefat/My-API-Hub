import Sidebar from "../component/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 pl-6 overflow-y-auto">{children}</main>
    </div>
  );
}
