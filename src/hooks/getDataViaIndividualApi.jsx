import axios from 'axios';

// Function to fetch data from an individual API endpoint
export const getDataViaIndividualApi = async (apiLink) => {
  try {
    // Send a GET request to the provided API link
    const response = await axios.get(apiLink);

    // If request is successful, return the data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);

    // Re-throw the error to handle it in the component
    throw error;
  }
};
