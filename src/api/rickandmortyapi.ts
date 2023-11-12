import axios from 'axios';
import { IEpisode, ICharacter, TCharactersResult } from '../types';

const rickAndMortyAxios = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  method: 'GET',
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data.error || error.message);
      return error.response;
    } else if (error instanceof Error) {
      console.error('Error: ', error.message);
    }
  }
);

// https://rickandmortyapi.com/api/character

export const getCharacters = (name: string, page: string) =>
  rickAndMortyAxios<TCharactersResult>({
    url: '/character',
    params: { name, page },
  });

export const getCharacter = (id: number) =>
  rickAndMortyAxios<ICharacter>({ url: `/character/${id}` });

export const getEpisodes = async (queries: string[]) =>
  axios.all(queries.map((q) => rickAndMortyAxios.get<IEpisode>(q)));
