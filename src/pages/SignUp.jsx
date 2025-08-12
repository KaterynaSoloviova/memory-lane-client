import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { VintageDecorations, VintageOrnament, VintageContainer, vintageClasses } from "../utils/vintageStyles.jsx";

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
    <main className={vintageClasses.pageContainer}>
      <VintageDecorations />
      
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-md mx-auto">
          <VintageContainer className="text-center">
            <VintageOrnament symbol="✨" />
            <h2 className="text-4xl font-bold mb-8 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Join Memory Lane</h2>

            <form onSubmit={handleSignupSubmit} className="space-y-6 text-left">
              <div>
                <label className="block font-medium text-[#8B4513] mb-2" style={{fontFamily: 'Georgia, serif'}} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmail}
                  className="w-full border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block font-medium text-[#8B4513] mb-2" style={{fontFamily: 'Georgia, serif'}} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  className="w-full border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block font-medium text-[#8B4513] mb-2" style={{fontFamily: 'Georgia, serif'}} htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsername}
                  className="w-full border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                  autoComplete="off"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className={vintageClasses.button.primary}
                >
                  <span className="text-xl mr-2">✨</span>
                  Create Account
                </button>
              </div>
            </form>

            {errorMessage && (
              <p className="mt-6 text-red-600 font-semibold text-center">{errorMessage}</p>
            )}

            <VintageOrnament size="sm" symbol="✦" />
            
            <p className="text-center text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>
              Already have an account?{" "}
              <Link to="/login" className="text-[#CD853F] hover:text-[#D2691E] font-semibold underline transition-colors">
                Log in
              </Link>
            </p>
          </VintageContainer>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
