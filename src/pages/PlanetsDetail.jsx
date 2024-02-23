import React, { useState, useEffect } from "react";
import { getIndividualPlanetInfo } from "../hooks/getIndividualPlanetInfo";
import LoadingData from "../components/Loading/LoadingData";
import Loading from "../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { getDataViaIndividualApi } from "../hooks/getDataViaIndividualApi";
import ResidentCard from "../components/ResidentCard";

const PlanetsDetail = () => {
  // Fetching the planet ID from the URL parameters
  let { planetId } = useParams();

  // State variables
  const [residents, setResidents] = useState([]);
  const [loadingResidents, setLoadingResidents] = useState(false); 
  const [residentsPresent, setResidentsPresent] = useState(false);

  // Fetching individual planet info hook
  const { planetsData, isLoading } = getIndividualPlanetInfo(planetId);

  // Effect to fetch residents data when planet data is loaded
  useEffect(() => {
    if (!isLoading && planetsData && planetsData?.residents) {
      setLoadingResidents(true);
      setResidentsPresent(true);

      // If there are no residents, update loading state and flag
      if (planetsData?.residents.length === 0) {
        setLoadingResidents(false);
        setResidentsPresent(false);
      }

      // Fetch data for each resident
      const fetchResidentsData = async () => {
        const residentsDataPromises = planetsData.residents.map((residentUrl) =>
          getDataViaIndividualApi(residentUrl)
        );

        const residentsData = await Promise.all(residentsDataPromises);
        setResidents(residentsData.map((resident) => resident));
      };
      fetchResidentsData();
    }
  }, [isLoading, planetsData]);

  // Effect to update loading state when residents data is loaded
  useEffect(() => {
    if (residents.length > 0) {
      setLoadingResidents(false);
    }
  }, [residents]);

  // Render loading indicator while fetching planet data
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loading />
      </div>
    );
  }

  return (
    <section className="px-5 py-5 flex flex-col gap-5 sm:px-10">
      {/* Planet details */}
      <div className="text-4xl font-bold text-center text-white underline">
        {planetsData.name}
      </div>
      <div className="text-base text-gray-200 flex flex-wrap gap-1">
        {/* Displaying planet details */}
        {/* Displaying planet details */}
        <span>Rotation period: {planetsData.rotation_period},</span>
        <span>Orbital period: {planetsData.orbital_period}days,</span>
        <span>Climate: {planetsData.climate},</span>
        <span>Diameter: {planetsData.diameter}km,</span>
        <span>Gravity: {planetsData.gravity},</span>
        <span>Terrain: {planetsData.terrain},</span>
        <span>Population: {planetsData.population},</span>
        <span>Residents: {planetsData?.residents.length},</span>
        <span>Films: {planetsData?.films.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {/* Residents section */}
        <p className="text-xl text-white underline">Residents</p>
        {loadingResidents ? (
          // Render loading indicator while fetching residents data
          <div className="flex justify-center items-center h-24">
            <LoadingData text="Loading residents" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Displaying resident cards or message if no residents */}
            {residentsPresent ? (
              residents.map((item, index) => (
                <ResidentCard key={index} {...item} />
              ))
            ) : (
              <div className="text-white text-2xl">
                No residents reside on this planet!
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlanetsDetail;
