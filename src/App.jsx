import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const getWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");

      const apiKey = import.meta.env.VITE_API_KEY;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeather(response.data);
      setCity("");
    } catch (err) {
      console.log(err.response.data);

      setError(err.response.data.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <h1>Weather App</h1>

      <button
        className="toggle-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getWeather();
            }
          }}
        />

        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>

          <h1>{Math.round(weather.main.temp)}°C</h1>

          <p>{weather.weather[0].main}</p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <div className="details">
            <div>
              <p>Humidity</p>
              <h3>{weather.main.humidity}%</h3>
            </div>

            <div>
              <p>Wind</p>
              <h3>{weather.wind.speed} km/h</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;