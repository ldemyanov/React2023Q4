import { http, HttpResponse } from 'msw';
import characters from '../responses/characters.json';

export const handlers = [
  http.get<never>('https://rickandmortyapi.com/api/character', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (name === 'noCharacters') {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found',
      });
    }

    return HttpResponse.json(characters);
  }),

  http.get<never>('https://rickandmortyapi.com/api/character/1', () => {
    return HttpResponse.json({
      id: 1,
      name: 'Rick Sanchez 2',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
      location: {
        name: 'Citadel of Ricks',
        url: 'https://rickandmortyapi.com/api/location/3',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    });
  }),
];
