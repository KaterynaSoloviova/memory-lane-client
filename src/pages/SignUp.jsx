import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../config/config";
import { VintageDecorations, VintageOrnament, VintageContainer, vintageClasses } from "../utils/vintageStyles.jsx";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [searchParams] = useSearchParams();
  const capsuleId = searchParams.get('capsule');

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

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
      .then(async (response) => {
        // Store token and authenticate user
        storeToken(response.data.authToken);
        
        // Wait for authentication to complete
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // If there's a capsule ID in the URL, join the capsule
        if (capsuleId) {
          try {
            const token = localStorage.getItem("authToken");
            await axios.post(
              `${BASE_URL}/api/capsules/${capsuleId}/join`,
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            // Show success message and redirect to capsules
            navigate("/capsules");
          } catch (err) {
            console.error("Error joining capsule:", err);
            // Still redirect to capsules even if join fails
            navigate("/capsules");
          }
        } else {
          // Check if there's a pending capsule join from localStorage
          const pendingCapsuleJoin = localStorage.getItem("pendingCapsuleJoin");
          if (pendingCapsuleJoin) {
            localStorage.removeItem("pendingCapsuleJoin");
            try {
              const token = localStorage.getItem("authToken");
              await axios.post(
                `${BASE_URL}/api/capsules/${pendingCapsuleJoin}/join`,
                {},
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
            } catch (err) {
              console.error("Error joining pending capsule:", err);
            }
            navigate("/capsules");
          } else {
            navigate("/");
          }
        }
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
            <h2 className="text-4xl font-bold mb-8 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>
              {capsuleId ? 'Join Time Capsule' : 'Join Memory Lane'}
            </h2>
            {capsuleId && (
              <p className="text-lg text-[#A0522D] mb-6 italic" style={{fontFamily: 'Georgia, serif'}}>
                Create an account to join this time capsule and be notified when it unlocks!
              </p>
            )}

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
