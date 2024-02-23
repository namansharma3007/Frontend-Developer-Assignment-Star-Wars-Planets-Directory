import React from "react";
import Navbar from "./components/Navbar";
import Hereosection from "./pages/Hereosection";
import { Route, Routes } from "react-router-dom";
import PlanetsDetail from "./pages/PlanetsDetail";

// Main App component
const App = () => {
  return (
    <div className="w-full h-full">
      {/* Background video and overlay */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <video
          autoPlay
          muted
          loop
          id="video-bg"
          className="w-full h-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="fixed inset-0 bg-black opacity-50"></div>
      </div>

      {/* Navbar component */}
      <Navbar />

      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<Hereosection />} />
        <Route path="/planet" element={<Hereosection />} />
        <Route path="/planet/:planetId" element={<PlanetsDetail />} />
      </Routes>
    </div>
  );
};

export default App;
