import React, { useState, useEffect } from "react";
import PlanetCard from "../components/PlanetCard";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading/Loading";
import { getPlanetsInfo } from "../hooks/getPlanetsInfo";
import LoadingData from "../components/Loading/LoadingData";

export default function HeroSection() {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [planetsDataDisplay, setPlanetsDataDisplay] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const { planetsData, isLoading } = getPlanetsInfo(currentPageNumber);

  useEffect(() => {
    if (planetsData) {
      setPlanetsDataDisplay(planetsData?.results);
      setIsLoadingData(false);
    }
  }, [planetsData]);

  useEffect(() => {
    setIsLoadingData(true);
  }, [currentPageNumber]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="h-max p-10 mb-3">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold tracking-wider text-white">
            Explore the galaxy
          </h2>
          <p className="text-base text-gray-200">
            Discover planets from across the Star Wars galaxy
          </p>
        </div>
        {isLoadingData ? (
          <div className="flex justify-center items-center h-96">
            <LoadingData text="Loading planets" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
        <Pagination
          setCurrentPageNumber={setCurrentPageNumber}
          currentPageNumber={currentPageNumber}
          totalData={planetsData?.count}
        />
      </div>
    </section>
  );
}
