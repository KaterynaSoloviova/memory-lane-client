import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/config";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
      username, 
    };

    axios
      .post(`${BASE_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "Signup failed";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <form onSubmit={handleSignupSubmit} className="grid gap-4">
        <label className="text-left font-bold text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmail}
          className="border rounded p-2"
          autoComplete="off"
        />

        <label className="text-left font-bold text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePassword}
          className="border rounded p-2"
          autoComplete="off"
        />

        <label className="text-left font-bold text-gray-700" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsername}
          className="border rounded p-2"
          autoComplete="off"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600 transition"
        >
          Create Account
        </button>
      </form>

      {errorMessage && (
        <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
      )}

      <p className="mt-6 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
