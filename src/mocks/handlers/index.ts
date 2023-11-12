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
];
