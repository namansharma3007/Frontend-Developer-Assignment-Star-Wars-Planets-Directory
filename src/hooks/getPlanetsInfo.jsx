import axios from "axios";
import { useEffect, useState } from "react";

export const getPlanetsInfo = (pageNo) => {
  const [planetsData, setPlanetsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://swapi.dev/api/planets/?page=${pageNo}`;
        const response = await axios.get(url);
        setPlanetsData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageNo]);

  return { planetsData, isLoading };
};
