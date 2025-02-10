import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

// This is the component that will handle displaying the trip details.
const TripResults = () => {
  const location = useLocation();
  let { data } = location.state || {}; // Extract 'data' from location state

  // State to hold parsed trip data
  const [tripData, setTripData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    console.log("Received data:", data); // Log the received data

    if (!data) {
      setError("No data received.");
      setIsLoading(false);
      return;
    }

    if (data) {
      // try {
      //   // Process candidates (assuming the structure is as expected)
      //   const processedCandidates = data.candidates.map((candidate) => {
      //     const candidateData = candidate.content.parts[0].text;
      //     return candidateData;
      //   });
      //   setTripData(processedCandidates);
      // } catch (error) {
      //   console.error("Error parsing trip data:", error);
      //   setError("Error parsing trip data.");
      //   setTripData([]);
      // }
      let arr = data.candidates[0].content.parts[0].text
        .split("json")[1]
        .split("```")[0];
      arr = JSON.parse(arr.replace(/\/\/.*$/gm, ""));
      console.log(Array.isArray(arr));
      console.log("first==================================");
      setTripData(arr);
    } else {
      setError(
        "Unexpected data structure. 'candidates' field might be missing or invalid."
      );
      setTripData([]);
    }

    setIsLoading(false);
  }, [data]);

  console.log("tripdata", tripData);

  return (
    <div className="trip-results-container">
      <h1 className="text-3xl font-bold text-center mt-10">
        Your Perfect Trip is Ready!
      </h1>

      {isLoading ? (
        <p className="text-center text-xl mt-10">Loading trip details...</p>
      ) : error ? (
        <p className="text-center text-xl mt-10 text-red-500">{error}</p>
      ) : tripData.length === 0 ? (
        <p className="text-center text-xl mt-10">No trip details available.</p>
      ) : (
        tripData.map((trip, index) => (
          <div
            key={index}
            className="trip-card mt-10 p-5 border rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-blue-600">{trip.name}</h2>
            <p className="text-lg mt-2">
              <strong>Duration:</strong> {trip.duration}
            </p>
            <p className="mt-3">{trip.description}</p>

            {/* Highlights */}
            <div className="trip-highlights mt-5">
              <strong>Highlights:</strong>
              <ul className="list-disc list-inside mt-2">
                {trip.highlights && trip.highlights.length > 0 ? (
                  trip.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))
                ) : (
                  <li>No highlights available</li>
                )}
              </ul>
            </div>

            {/* Itinerary */}
            <div className="trip-itinerary mt-5">
              <strong>Itinerary:</strong>
              {trip.itinerary && trip.itinerary.length > 0 ? (
                <ul className="list-decimal list-inside mt-2">
                  {trip.itinerary.map((day, i) => (
                    <li key={i} className="mt-2">
                      <strong>Day {day.day}:</strong>
                      <ul className="list-disc ml-5">
                        {day.activities.map((activity, j) => (
                          <li key={j}>{activity}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No itinerary available</p>
              )}
            </div>

            {/* Budget Breakdown */}
            <div className="budget-breakdown mt-5">
              <strong>Budget Breakdown:</strong>
              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>Transportation:</strong> 
                  {trip.budget_breakdown.transportation}
                </li>
                <li>
                  <strong>Accommodation:</strong> 
                  {trip.budget_breakdown.accommodation}
                </li>
                <li>
                  <strong>Food:</strong> {trip.budget_breakdown.food}
                </li>
                <li>
                  <strong>Local Transport & Entry Fees:</strong> 
                  {trip.budget_breakdown.local_transport_and_entry_fees}
                </li>
                <li className="font-bold">
                  <strong>Total Estimated Cost:</strong> 
                  {trip.budget_breakdown.total_estimated_cost}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TripResults;
