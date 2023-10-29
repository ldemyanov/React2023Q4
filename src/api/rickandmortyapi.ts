import { FgetCharacters } from "../types";
import { NetworkError } from "../errors";

const apiUrl = "https://rickandmortyapi.com/api";

export const getCharacters: FgetCharacters = async (queryString: string) => {
  const response = await fetch(`${apiUrl}/character/?name=${queryString}`);

  if (!response.ok) throw new NetworkError(`Request failed with status ${response.status}`, response.status);

  return await response.json();
}
