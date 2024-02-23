import axios from "axios";
import { useEffect, useState } from "react";

// Function to fetch information about planets based on page number
export const getPlanetsInfo = (pageNo) => {
  // State variables to store planets data and loading state
  const [planetsData, setPlanetsData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch data when page number changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the URL for fetching planets data based on the page number
        let url = `https://swapi.dev/api/planets/?page=${pageNo}`;
        
        // Send a GET request to fetch planets data
        const response = await axios.get(url);
        
        // Set the fetched planets data to state
        setPlanetsData(response.data);
        
        // Update loading state to false as data fetching is complete
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Update loading state to false in case of error
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageNo]); // Dependencies array: re-run effect when pageNo changes

  return { planetsData, isLoading };
};
