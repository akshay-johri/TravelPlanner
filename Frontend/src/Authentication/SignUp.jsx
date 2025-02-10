import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import useAuth from AuthContext

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // State to hold email error message
  const { register, error, setError, loading } = useAuth(); // Use the register function and state from AuthContext
  const navigate = useNavigate();

  // Handle email input change and validate Gmail format
  const handleInvalidEmail = (e) => {
    const emailValue = e.target.value;
    // setEmail(emailValue);

    // Validate email format (should end with @gmail.com)
    if (emailValue && !emailValue.endsWith("@gmail.com")) {
      setEmailError(
        "Please enter a valid Gmail address (e.g. example@gmail.com)"
      );
    } else {
      setEmailError(""); // Clear the error if the email is valid
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email is valid
    if (!email.endsWith("@gmail.com")) {
      setEmailError(
        "Please enter a valid Gmail address (e.g. example@gmail.com)"
      );
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Call the register function from AuthContext
    const result = await register(email, password);
    if (result.success) {
      alert("Sign-up successful! Redirecting to login...");
      navigate("/login"); // Navigate to login page after successful registration
    } else {
      alert(error || "Email already exists. Please login!");
      setError("");
    }

    console.log("Form submitted", { email, password });
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        {/* Container with flex-col for vertical layout */}
        <div className="g-6 flex h-full flex-col items-center justify-center lg:justify-between">
          {/* Left column container (Image) */}
          <div className="mb-6 w-1/2 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-11/12 h-auto"
              alt="Sample image"
            />
          </div>

          {/* Right column container (Sign Up Form) */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit}>
              {/* Sign up section */}
              <div className="flex flex-row items-center justify-end lg:justify-start ml-20">
                <p className=" mr-4 text-lg text-right ml-10 px-20 mb-4 font-bold ">
                  Sign Up
                </p>
              </div>
              {/* Email input */}

              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
              <div onFocus={() => setEmailError("")}>
                <Input
                  type="email"
                  className="mb-6 w-full rounded-2xl"
                  placeholder="Email address"
                  value={email}
                  onBlur={handleInvalidEmail} // Use custom email change handler
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Show email error */}
              {/* Password input */}
              <Input
                type="password"
                className="mb-6 w-full rounded-2xl"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Confirm Password input */}
              <Input
                type="password"
                className="mb-3 w-full rounded-2xl"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {/* Submit button */}
              <div className="text-center lg:text-left ml-20 px-8">
                <button
                  type="submit"
                  className="inline-block bg-primary px-7 pb-2.5 pt-3 text-sm font-medium text-white ml-20 rounded-full"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>

                {/* Already have an account link */}
                <p className=" text-sm font-semibold ">
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
