import React, { useState, useEffect } from "react";
import PlanetCard from "../components/PlanetCard";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading/Loading";
import { getPlanetsInfo } from "../hooks/getPlanetsInfo";
import LoadingData from "../components/Loading/LoadingData";

export default function HeroSection() {
  // State variables
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [planetsDataDisplay, setPlanetsDataDisplay] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetching planets data hook
  const { planetsData, isLoading } = getPlanetsInfo(currentPageNumber);

  // Effect to update displayed planets data when planetsData changes
  useEffect(() => {
    if (planetsData) {
      setPlanetsDataDisplay(planetsData?.results);
      setIsLoadingData(false);
    }
  }, [planetsData]);

  // Effect to set loading state to true when currentPageNumber changes
  useEffect(() => {
    setIsLoadingData(true);
  }, [currentPageNumber]);

  // Display loading animation while data is being fetched
  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="h-max px-5 py-10 sm:px-10">
      <div className="flex flex-col gap-3">
        {/* Section title and description */}
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold tracking-wider text-white">
            Explore the galaxy
          </h2>
          <p className="text-base text-gray-200">
            Discover planets from across the Star Wars galaxy
          </p>
        </div>

        {/* Loading indicator while fetching data */}
        {isLoadingData ? (
          <div className="flex justify-center items-center h-[23rem]">
            <LoadingData text="Loading planets" />
          </div>
        ) : (
          /* Displaying planets data */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-5">
            {planetsDataDisplay.map((item, index) => (
              <PlanetCard
                key={index}
                value={(currentPageNumber - 1) * 10 + 1 + index}
                name={item.name}
                climate={item.climate}
                diameter={item.diameter}
                population={item.population}
                terrain={item.terrain}
              />
            ))}
          </div>
        )}

        {/* Pagination component */}
        <Pagination
          setCurrentPageNumber={setCurrentPageNumber}
          currentPageNumber={currentPageNumber}
          totalData={planetsData?.count}
        />
      </div>
    </section>
  );
}
