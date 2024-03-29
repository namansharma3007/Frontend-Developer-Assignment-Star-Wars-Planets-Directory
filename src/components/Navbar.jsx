import React from "react";
import SATURN from '../assets/saturn.png';

// Navbar component
const Navbar = () => {
  return (
    <div className="flex justify-center py-3 w-full">
      <div className="flex gap-1 items-center">
        <img
          src={SATURN}
          alt="img"
          className="w-10 h-10 filter brightness-0 invert grayscale"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Galactic Explorer</h1>
      </div>
    </div>
  );
};

export default Navbar;
