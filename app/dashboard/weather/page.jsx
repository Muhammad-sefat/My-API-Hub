"use client";
import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Weather</h2>
      {weather ? <p>{weather.weather[0].description}</p> : <p>Loading...</p>}
    </div>
  );
}
