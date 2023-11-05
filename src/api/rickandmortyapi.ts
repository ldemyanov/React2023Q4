import { NetworkError } from '../errors';
import { FgetCharacters, FgetEpisodes, IEpisode, FgetCharacter } from '../types';

const apiUrl = 'https://rickandmortyapi.com/api';

export const getCharacters: FgetCharacters = async (query, page) => {
  let urlQuery = `${apiUrl}/character/?name=${query}`;
  if (page) urlQuery += `&page=${page}`;

  const response = await fetch(urlQuery);

  if (!response.ok)
    throw new NetworkError(`Request failed with status ${response.status}`, response.status);

  return await response.json();
};

export const getCharacter: FgetCharacter = async (id) => {
  const response = await fetch(`${apiUrl}/character/${id}`);

  if (!response.ok)
    throw new NetworkError(`Request failed with status ${response.status}`, response.status);

  return await response.json();
};

export const getEpisodes: FgetEpisodes = async (queries) => {
  const responses = await Promise.all(queries.map((q) => fetch(q)));
  const episodes: Array<Promise<IEpisode>> = [];

  responses.forEach(async (response) => {
    if (response.ok) {
      episodes.push(response.json());
      return;
    }

    throw new NetworkError(`Request failed with status ${response.status}`, response.status);
  });

  return Promise.all(episodes);
};
