"use client";

import { useState } from "react";
import Form from "./components/Form";
import WeatherGraph from "./components/WeatherGraph";
import WeatherTable from "./components/WeatherTable";
import axios from "axios";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather data from Open-Meteo API
  const fetchWeatherData = async ({
    latitude,
    longitude,
    startDate,
    endDate,
  }) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude,
            longitude,
            start_date: startDate,
            end_date: endDate,
            daily: [
              "temperature_2m_max",
              "temperature_2m_min",
              "temperature_2m_mean",
              "apparent_temperature_max",
              "apparent_temperature_min",
              "apparent_temperature_mean",
            ].join(","),
          },
        }
      );
      setWeatherData(response.data.daily);
    } catch (err) {
      setError(
        "Failed to fetch data. Please check your inputs or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-5xl mx-auto min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Weather Dashboard</h1>

      {/* Input Form */}
      <Form onSubmit={fetchWeatherData} />

      {/* Loading State */}
      {loading && (
        <p className="text-center mt-4 text-blue-500">
          Fetching weather data...
        </p>
      )}

      {/* Error Message */}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {/* Weather Data Display */}
      {weatherData && (
        <div className="mt-6 space-y-6">
          {/* Weather Graph */}
          <WeatherGraph
            labels={["2024-12-01", "2024-12-02", "2024-12-03"]} // Example dates
            data={{
              maxTemp: [30, 31, 29],
              minTemp: [20, 21, 19],
            }}
          />

          {/* Weather Table */}
          <WeatherTable data={weatherData} />
        </div>
      )}
    </main>
  );
}
