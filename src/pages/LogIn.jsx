import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../config/config";
import { VintageDecorations, VintageOrnament, VintageContainer, vintageClasses } from "../utils/vintageStyles.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [searchParams] = useSearchParams();
  const capsuleId = searchParams.get('capsule');

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${BASE_URL}/auth/login`, requestBody)
      .then(async (response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        
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
            navigate("/capsules");
          } catch (err) {
            console.error("Error joining capsule:", err);
            navigate("/capsules");
          }
        } else {
          // Check if there's a pending capsule join
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
          error.response?.data?.message || "Login failed. Please try again.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <main className={vintageClasses.pageContainer}>
      <VintageDecorations />
      
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-md mx-auto">
          <VintageContainer className="text-center">
            <VintageOrnament symbol="🔑" />
            <h2 className="text-4xl font-bold mb-8 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>
              {capsuleId ? 'Join Time Capsule' : 'Welcome Back'}
            </h2>
            {capsuleId && (
              <p className="text-lg text-[#A0522D] mb-6 italic" style={{fontFamily: 'Georgia, serif'}}>
                Log in to join this time capsule and be notified when it unlocks!
              </p>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-6 text-left">
              <div>
                <label htmlFor="email" className="block font-medium text-[#8B4513] mb-2" style={{fontFamily: 'Georgia, serif'}}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block font-medium text-[#8B4513] mb-2" style={{fontFamily: 'Georgia, serif'}}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                  autoComplete="current-password"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className={vintageClasses.button.primary}
                >
                  <span className="text-xl mr-2">🔑</span>
                  Log In
                </button>
              </div>
            </form>

            {errorMessage && (
              <p className="mt-6 text-red-600 font-medium text-center">{errorMessage}</p>
            )}

            <VintageOrnament size="sm" symbol="✦" />
            
            <p className="text-center text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-[#CD853F] hover:text-[#D2691E] font-semibold underline transition-colors">
                Sign Up
              </Link>
            </p>
          </VintageContainer>
        </div>
      </section>
    </main>
  );
}

export default Login;
