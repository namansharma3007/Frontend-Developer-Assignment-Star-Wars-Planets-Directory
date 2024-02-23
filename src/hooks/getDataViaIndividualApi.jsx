import axios from 'axios';

export const getDataViaIndividualApi = async (apiLink) => {
  try {
    const response = await axios.get(apiLink);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};
