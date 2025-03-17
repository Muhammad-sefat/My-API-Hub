"use client";
import { useEffect, useState } from "react";
import { getWeatherByCity, getWeatherByCoords } from "../../lib/weatherApi";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h2 className="text-4xl font-bold mb-6">🌤️ Weather Now</h2>
      <p className="text-lg mb-4">Current Time: {currentTime}</p>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 rounded-md text-black shadow-md"
        />
        <button
          onClick={handleSearch}
          className="bg-white text-blue-600 px-5 py-3 rounded-md shadow-md hover:bg-gray-200 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-red-500 text-xl font-medium">{error}</p>}

      {weather && (
        <div className="bg-white p-8 rounded-lg shadow-lg text-black w-1/2 text-center">
          <h3 className="text-3xl font-bold">
            {weather.name}, {weather.sys.country}
          </h3>
          <p className="text-xl capitalize">{weather.weather[0].description}</p>
          <p className="text-5xl font-bold mt-2">
            {Math.round(weather.main.temp)}°C
          </p>
          <div className="flex justify-between mt-4 text-lg">
            <p>🌡️ Max: {Math.round(weather.main.temp_max)}°C</p>
            <p>❄️ Min: {Math.round(weather.main.temp_min)}°C</p>
          </div>
          <p className="mt-2">💨 Wind Speed: {weather.wind.speed} m/s</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>☁️ Cloudiness: {weather.clouds.all}%</p>
          <div className="mt-4 border-t pt-3 flex justify-between">
            <p>🌅 Sunrise: {formatTime(weather.sys.sunrise)}</p>
            <p>🌇 Sunset: {formatTime(weather.sys.sunset)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
