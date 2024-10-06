// useFetchCharacters.ts
import { MARVEL_API_BASE_URL, MARVEL_API_KEY } from './config';

export const fetchCharactersApi = async (offset: number) => {
  try {
    const response = await fetch(`${MARVEL_API_BASE_URL}/characters?apikey=${MARVEL_API_KEY}&limit=10&offset=${offset}`);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error fetching characters: ${response.status} ${response.statusText}`);
    }
    
    const results = await response.json();
    
    // Ensure that data is present
    if (!results.data) {
      throw new Error('No character data found');
    }
    
    return results.data;
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw error; // Rethrow the error if you want to handle it later
  }
};

export const fetchComicsApi = async (offset: number) => {
  try {
    const response = await fetch(`${MARVEL_API_BASE_URL}/comics?apikey=${MARVEL_API_KEY}&limit=10&offset=${offset}`);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error fetching comics: ${response.status} ${response.statusText}`);
    }
    
    const results = await response.json();
    
    // Ensure that data is present
    if (!results.data) {
      throw new Error('No comic data found');
    }
    
    return results.data;
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw error; // Rethrow the error if you want to handle it later
  }
};

// New function to fetch a character by ID
export const fetchCharacterByIdApi = async (id: number) => {
  try {
    const response = await fetch(`${MARVEL_API_BASE_URL}/characters/${id}?apikey=${MARVEL_API_KEY}`);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error fetching character with ID ${id}: ${response.status} ${response.statusText}`);
    }
    
    const results = await response.json();

    console.log(results)
    
    // Ensure that data is present
    if (!results.data) {
      throw new Error(`No character found with ID ${id}`);
    }
    
    return results.data.results[0]; // Return the character object
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw error; // Rethrow the error if you want to handle it later
  }
};
