import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import DemoCapsule from "./pages/DemoCapsule";
import CreateCapsule from "./pages/CreateCapsule";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import PrivateRoute from "./components/PrivateRoute";
import MyCapsules from "./pages/MyCapsules";
import PublicCapsulesPage from "./pages/PublicCapsulesPage";
import ViewCapsulePage from "./pages/ViewCapsulePage";
import AboutMePage from "./pages/About";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoCapsule />} />
        <Route path="/about" element={<AboutMePage />} />
        <Route
          path="/capsules"
          element={
            <PrivateRoute>
              <MyCapsules />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Create new capsule */}
        <Route
          path="/create-capsule"
          element={
            <PrivateRoute>
              <CreateCapsule />
            </PrivateRoute>
          }
        />

        {/* Edit existing draft capsule */}
        <Route
          path="/create-capsule/:id"
          element={
            <PrivateRoute>
              <CreateCapsule />
            </PrivateRoute>
          }
        />

        <Route path="/public" element={<PublicCapsulesPage />} />
        <Route path="/public/:id" element={<ViewCapsulePage />} />
        <Route path="/preview/:id" element={<ViewCapsulePage />} />

        {/* View unlocked capsule */}
        <Route
          path="/capsule/:id"
          element={
            <PrivateRoute>
              <ViewCapsulePage />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
