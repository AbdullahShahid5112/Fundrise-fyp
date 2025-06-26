import React, { useEffect, useState } from "react";
import PitchCard from "./PitchCard";
import api from "../../api/axios"; // adjust path if needed

const PitchCards = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const res = await api.get("/pitch/info"); 
        console.log("✅ Pitches response:", res.data);

        setPitches(res.data.pitches);
      } catch (err) {
        console.error("❌ Axios error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPitches();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-gray-500">Loading pitches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600">
        <p>Error loading pitches: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (pitches.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <p>No pitches found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto space-y-6">
      {pitches.map((pitch) => (
        <PitchCard key={pitch._id} pitch={pitch} />
      ))}
    </div>
  );
};

export default PitchCards;
