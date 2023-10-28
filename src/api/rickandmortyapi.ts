import { FgetCharacters } from "../types";

const apiUrl = "https://rickandmortyapi.com/api";

export const getCharacters: FgetCharacters = async (queryString: string) => {

  try {
    const response = await fetch(`${apiUrl}/character/?name=${queryString}`);
    
    if (response.ok) return await response.json();
  
    throw new NetworkError(`Request failed with status ${response.status}`);
    
  } catch (error) {
    error instanceof NetworkError
      ? console.error('Network Error:', error.message)
      : console.error('Error:', error);
  }
}
