import axios from 'axios';
import {useState, useEffect} from 'react';

// Function to fetch individual planet information by ID
export const getIndividualPlanetInfo = (planetId) => {
    // State variables to store planet data and loading state
    const [planetsData, setPlanetsData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
  
    // Effect to fetch data when planetId changes
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Construct the URL for fetching planet data based on the planetId
          let url = `https://swapi.dev/api/planets/${planetId}`;
          
          // Send a GET request to fetch planet data
          const response = await axios.get(url);
          
          // Set the fetched planet data to state
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
    }, [planetId]); // Dependencies array: re-run effect when planetId changes
  
    return { planetsData, isLoading };
}
