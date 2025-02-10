import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import AuthContext

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, setError, isAuthenticated, setIsAuthenticated } =
    useAuth(); // Use setIsAuthenticated to update the state
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate("/create-trip");
  });

  // Replace with your own Google OAuth Client ID
  const googleClientId =
    "1069656832350-50lcmlpohdmr9sjd2ehjlfk5amadkpa7.apps.googleusercontent.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    try {
      // Call the login function from context
      const result = await login(email, password);
      if (result.success) {
        setIsAuthenticated(true);
        navigate("/create-trip");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Google login success handler
  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login success", response);
    // Handle the response here (e.g., send the token to the backend to authenticate)
    const { email } = response.profileObj;

    setIsAuthenticated(true);

    navigate("/create-trip");
  };

  // Google login failure handler
  const handleGoogleLoginFailure = (error) => {
    console.log("Google login failed", error);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 5000); // Clear error message after 5 seconds
    }
  }, [error, setError]);

  return (
    <section className="h-screen w-full bg-cover bg-center">
      <div className="h-full ">
        <div className="g-6 flex h-full flex-col items-center justify-center lg:justify-between">
          <div className="mb-6 w-1/2 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-11/12 h-auto"
              alt="Sample image"
            />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row items-center justify-end lg:justify-start ml-20">
                <p className=" mr-4 text-lg text-right ml-10 px-20 mb-4 font-bold">
                  Sign In
                </p>
              </div>

              <Input
                type="email"
                className="mb-6 w-full rounded-2xl bg-white"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                className="mb-6 w-full rounded-2xl bg-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Login button */}
              <div className="text-center lg:text-left ml-20 px-8">
                <button
                  type="submit"
                  className="inline-block  bg-primary px-7 pb-2.5 pt-3 text-sm font-medium text-white ml-20 rounded-full"
                >
                  Login
                </button>

                {/* Error message display */}
                {error && <p className="text-red-500 text-sm mt-2">{error} </p>}

                <p className="mb-20 m-2 text-sm font-semibold">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
