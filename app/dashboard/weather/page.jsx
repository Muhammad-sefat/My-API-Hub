"use client";
import { useEffect, useState } from "react";
import { getWeatherByCity, getWeatherByCoords } from "../../lib/weatherApi";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get user location weather
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            setLoading(true);
            const data = await getWeatherByCoords(latitude, longitude);
            setWeather(data);
            setLoading(false);
          } catch (err) {
            setError("Failed to fetch weather data");
            setLoading(false);
          }
        },
        () => {
          setError("Geolocation is not enabled.");
        }
      );
    }
  }, []);

  // Handle Search
  const handleSearch = async () => {
    if (!city) return;
    try {
      setLoading(true);
      setError("");
      const data = await getWeatherByCity(city);
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setError("City not found.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h2 className="text-3xl font-bold mb-4">🌤️Your Current Weather</h2>

      {/* Search Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded-md text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200"
        >
          Search
        </button>
      </div>

      {/* Loading & Error Message */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 text-xl font-medium">{error}</p>}

      {/* Weather Info */}
      {weather && (
        <div className="bg-white p-6 rounded-lg shadow-md text-black w-80 text-center">
          <h3 className="text-2xl font-bold">
            {weather.name}, {weather.sys.country}
          </h3>
          <p className="text-xl">{weather.weather[0].description}</p>
          <p className="text-4xl font-bold">
            {Math.round(weather.main.temp)}°C
          </p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
