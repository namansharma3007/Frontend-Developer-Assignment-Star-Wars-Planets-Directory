import React from "react";
import { Link } from "react-router-dom";

const PlanetCard = ({
  value,
  name,
  climate,
  diameter,
  population,
  terrain,
}) => {
  return (
    <Link
      to={`planet/${value}`}
      className="glass flex flex-col glass p-2 h-full transition duration-300 ease-in-out hover:scale-105"
    >
      <div className="text-xl underline text-white font-semibold text-center">{name}</div>
      <div className="text-base text-gray-200 flex flex-wrap flex-col gap-1">
        <span>Climate: {climate}</span>
        <span>Diameter: {diameter}km</span>
        <span>Polulation: {population}</span>
        <span>Terrain: {terrain}</span>
      </div>
    </Link>
  );
};

export default PlanetCard;
