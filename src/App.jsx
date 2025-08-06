import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import DemoCapsule from "./pages/DemoCapsule";
import CreateCapsule from "./pages/CreateCapsule";

function App() {

  return (
  <div>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/demo" element={<DemoCapsule />} />
      <Route path="/create-capsule" element={<CreateCapsule />} /> 
    </Routes>

    <Footer />
  </div>
  )
}

export default App;
