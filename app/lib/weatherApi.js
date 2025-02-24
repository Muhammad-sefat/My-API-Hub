const API_KEY = "d3ba1bc1b727ac36376bdb50bbc19249";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Function to get weather by city name
export async function getWeatherByCity(city) {
  const res = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error("City not found");
  return res.json();
}

// Function to get weather by latitude & longitude
export async function getWeatherByCoords(lat, lon) {
  const res = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error("Location not found");
  return res.json();
}
