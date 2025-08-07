import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../config/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${BASE_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/capsules");
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "Login failed. Please try again.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleLoginSubmit} className="grid gap-4">
        <label htmlFor="email" className="text-left font-bold text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2"
          autoComplete="email"
        />

        <label htmlFor="password" className="text-left font-bold text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2"
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600 transition"
        >
          Log In
        </button>
      </form>

      {errorMessage && (
        <p className="mt-4 text-red-600 font-medium">{errorMessage}</p>
      )}

      <p className="mt-6 text-center">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-blue-600 underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
