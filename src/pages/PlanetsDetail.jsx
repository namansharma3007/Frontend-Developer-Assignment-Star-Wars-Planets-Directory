import React, { useState, useEffect } from "react";
import { getIndividualPlanetInfo } from "../hooks/getIndividualPlanetInfo";
import LoadingData from "../components/Loading/LoadingData";
import Loading from "../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { getDataViaIndividualApi } from "../hooks/getDataViaIndividualApi";
import ResidentCard from "../components/ResidentCard";

const PlanetsDetail = () => {
  let { planetId } = useParams();

  const [residents, setResidents] = useState([]);
  const [loadingResidents, setloadingResidents] = useState(false);
  const [residentsPresent, setResidentsPresent] = useState(false);

  const { planetsData, isLoading } = getIndividualPlanetInfo(planetId);

  useEffect(() => {
    if (!isLoading && planetsData && planetsData?.residents) {
      setloadingResidents(true);
      setResidentsPresent(true);
      if (planetsData?.residents.length == 0) {
        setloadingResidents(false);
        setResidentsPresent(false);
      }
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

  useEffect(() => {
    if (residents.length > 0) {
      setloadingResidents(false);
    }
  }, [residents]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loading />
      </div>
    );
  }

  // const residentsDisplay = residents.map((item, index) => (
  //   <ResidentCard key={index} {...item} />
  // ));

  return (
    <section className="px-5 py-5 flex flex-col gap-5 sm:px-10">
      <div className="text-4xl font-bold text-center text-white underline">
        {planetsData.name}
      </div>
      <div className="text-base text-gray-200 flex flex-wrap gap-1">
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
        <p className="text-xl text-white underline">Residents</p>
        {loadingResidents ? (
          <div className="flex justify-center items-center h-24">
            <LoadingData text="Loading residents" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              residentsPresent ? (residents.map((item, index) => (
                <ResidentCard key={index} {...item} />
              ))):
              (<div className="text-white text-2xl">No residents reside on this planet!</div>)
            }
          </div>
        )}
      </div>
    </section>
  );
};

export default PlanetsDetail;
