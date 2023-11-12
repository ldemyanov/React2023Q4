import { http, HttpResponse } from 'msw';
import characters from '../responses/characters.json';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character', () => {
    return HttpResponse.json(characters);
  }),

  http.get('https://rickandmortyapi.com/api/character/?name=Notcharacter', () => {
    return HttpResponse.json(characters);
  }),
];
