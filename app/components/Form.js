import React, { useState } from "react";

export default function Form({ onSubmit }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ latitude, longitude, startDate, endDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md space-y-4"
    >
      <div>
        <label>Latitude</label>
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          min="-90"
          max="90"
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Longitude</label>
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          min="-180"
          max="180"
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 w-full rounded"
      >
        Fetch Weather Data
      </button>
    </form>
  );
}
