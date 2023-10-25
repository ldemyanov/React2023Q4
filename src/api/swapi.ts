import { ISearchPersonResult } from "../types";

const apiUrl = "https://swapi.dev/api";

export const getPersonById = async (id: number = 1) => {
  const response = await fetch(`${apiUrl}/people/${id}`);
  return await response.json();
}

export const getPersonByName = async (name: string): Promise<ISearchPersonResult> => {
  const response = await fetch(`${apiUrl}/people/?search=${name}`);
  return await response.json();
}

