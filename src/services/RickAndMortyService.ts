import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICharacter, IEpisode, TCharactersResult } from '../types';

type FetchCharactersParams = {
  name?: string;
  page?: number;
  perPageElements?: 10 | 20;
};

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api',
  }),
  endpoints: (builder) => ({
    fetchCharacters: builder.query<TCharactersResult, FetchCharactersParams>({
      query: ({ name = '', page = 1, perPageElements }) => ({
        url: '/character',
        params: {
          page: perPageElements === 10 && page > 1 ? Math.ceil(page / 2) : page,
          name,
        },
      }),
      transformResponse: (response: TCharactersResult, _, params) => {
        if (response.results && params.perPageElements === 10) {
          const isFirstPart = ((params.page || 1) * params.perPageElements) % 20 !== 0;
          response.results = isFirstPart
            ? response.results.slice(0, 10)
            : response.results.slice(-10);
        }
        return response;
      },
    }),
    fetchCharacter: builder.query<ICharacter, number | string>({
      query: (id) => ({ url: `/character/${id}` }),
    }),
    fetchEpisode: builder.query<IEpisode, { num?: number; link?: string }>({
      query: ({ num = 1, link }) => ({
        url: link || `https://rickandmortyapi.com/api/episode/${num}`,
      }),
    }),
  }),
});

export const { useFetchCharactersQuery, useFetchCharacterQuery, useFetchEpisodeQuery } =
  rickAndMortyApi;
