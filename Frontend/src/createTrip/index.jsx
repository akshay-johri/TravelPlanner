import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios"; // Import axios

function CreateTrip() {
  // Define state for each input field
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [persons, setPersons] = useState("");
  const [startDate, setStartDate] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // Initialize navigate

  const [dateError, setDaterror] = useState("");
  // Handle form submission
  const handleDate = (e) => {
    const today = new Date();
    const date = new Date(e.target.value); // Convert the input string to a Date object

    // Set the time to midnight for both dates to avoid time comparison issues
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    // Compare the dates
    if (date < today) {
      setDaterror("Date should be in the future");
    } else {
      setDaterror("");
    }
  };

  const handleSubmit = async (e) => {
    console.log("first");
    e.preventDefault();

    setLoading(true); // Set loading to true when submitting
    const date = startDate; // assuming startDate is in 'YYYY-MM-DD' format
    const [year, month, day] = date.split("-"); // Split the date into components
    const reversedDate = `${day}-${month}-${year}`; // Reformat to 'DD-MM-YYYY'
    setStartDate(reversedDate);

    try {
      // Construct the trip request object
      const tripRequest = {
        place,
        days,
        budget,
        persons,
        startDate,
        travelStyle,
      };

      // Send POST request to backend API using axios
      const response = await axios.post(
        "http://localhost:8080/api/trip/generate",
        tripRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If the request is successful, navigate to trip result page with response data
      if (response.status === 200) {
        navigate("/trip-result", {
          state: { data: response.data },
        });
      } else {
        console.error("Failed to generate trip plan.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  return (
    <div className="mb-20 sm:px-10 md:px-32 lg:px-56 xl:px-66 px-5 mt-10">
      <h2 className="font-bold text-3xl">Share your Travel preferences 🏕️🌴</h2>
      <p className="mt-3 text-gray-600 text-xl">
        Provide us with a few details, and we'll design the perfect trip just
        for you!
      </p>
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-1">
        <div>
          <h2 className="text-xl my-3 font-medium">
            Enter your starting Location
          </h2>
          <Input
            className="hover:bg-gray-300"
            placeholder={"Ex: Bengaluru, Karnataka"}
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days do you want for your trip?
          </h2>
          <Input
            className="hover:bg-gray-300"
            placeholder={"Ex: 3"}
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Enter your Budget</h2>
          <Input
            className="hover:bg-gray-300"
            placeholder="Ex: 10,000"
            type="number"
            min="1000"
            step="1000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">No of persons</h2>
          <Input
            className="hover:bg-gray-300"
            placeholder="Ex: 1"
            type="number"
            min="1"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            required
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Preferred Trip Start Date
          </h2>
          {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
          <div onFocus={() => setDaterror("")}>
            <input
              placeholder="Select a date"
              type="date"
              value={startDate}
              onBlur={handleDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full text-lg p-1 hover:bg-gray-300 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Travel Style</h2>
          <select
            id="travelStyle"
            name="travelStyle"
            required
            className="w-full bg-white h-12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            value={travelStyle}
            onChange={(e) => setTravelStyle(e.target.value)}
          >
            <option value="">Select Travel Style</option>
            <option value="relaxation">Relaxation</option>
            <option value="family-friendly">Family-Friendly</option>
            <option value="adventure">Adventure</option>
            <option value="cultural-historical">Cultural-Historical</option>
            <option value="couple-tour">Couple Tour</option>
          </select>
        </div>

        <div className="my-10 justify-center flex">
          <Button type="submit" disabled={loading}>
            {loading ? "Generating Trip..." : "Generate Trip!"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTrip;
