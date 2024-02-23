import axios from 'axios';
import {useState, useEffect} from 'react';

export const getIndividualPlanetInfo = (planetId) => {
    const [planetsData, setPlanetsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          let url = `https://swapi.dev/api/planets/${planetId}`;
          const response = await axios.get(url);
          setPlanetsData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [planetId]);
  
    return { planetsData, isLoading };
}

