export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-700">
        Oops! The page you are looking for doesn't exist.
      </p>
      <a
        href="/"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Home
      </a>
    </div>
  );
}
