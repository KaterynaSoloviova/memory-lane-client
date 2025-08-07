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
import CapsuleDetails from './pages/CapsuleDetails';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoCapsule />} />
        <Route path="/capsules" element={<MyCapsules />} />
        <Route path="/capsule/:id" element={<CapsuleDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-capsule" element={
            <PrivateRoute>
              <CreateCapsule />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
