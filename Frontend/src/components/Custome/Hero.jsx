import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom"; // Use useNavigate for programmatic navigation
import { useAuth } from "@/Authentication/AuthContext"; // Assuming you have an AuthContext

function Hero() {
  const { isAuthenticated } = useAuth(); // Get the authentication status from context
  const navigate = useNavigate(); // Hook for navigation

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      navigate("/create-trip"); // Navigate to /create-trip if authenticated
    } else {
      navigate("/login"); // Navigate to login page if not authenticated
    }
  };

  return (
    <div
      className="flex flex-col items-start justify-center w-full h-screen gap-9 bg-cover bg-center mt-5 rounded-se-full"
      style={{
        backgroundImage: "url('/Welcome.jpeg')",
        backgroundBlendMode: "screen",
      }}
    >
      <div className="ml-10">
        <h1 className="font-extrabold text-[35px] text-left mt-5">
          <span className="text-[#ff7113]">
            Skip the hassle, plan in a flash!
          </span>
          <br />
          <div className="mt-3 text-white">
            AI-powered trips tailored for you
            <br />
            Fast, easy, and ready to go!
          </div>
        </h1>
        <p className="text-xl  text-white text-center mt-5">
          Plan your perfect trip in minutes with our AI-powered planner
          <br />
          your adventure starts with a click!
        </p>
      </div>
      <div className="  ml-60">
        <Button onClick={handleGetStartedClick} className="py-5 px-10">
          Get Started!
        </Button>
      </div>
    </div>
  );
}

export default Hero;
