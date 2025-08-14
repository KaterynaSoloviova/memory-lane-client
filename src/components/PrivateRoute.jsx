import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import VintageLoader from "./VintageLoader";
import { vintageClasses, VintageDecorations } from "../utils/vintageStyles";

function PrivateRoute({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <main className={vintageClasses.pageContainer}>
        <VintageDecorations />
        <section className="relative z-10 px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <VintageLoader 
              size="lg" 
              message="Authenticating..."
            />
          </div>
        </section>
      </main>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
