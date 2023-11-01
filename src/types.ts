/**
 * Prefices:
 * I - Interface
 * T - Type
 * F - Function
 **/

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  url: string;
  episode: string[];
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface IError {
  message: string;
  status: number;
}

export type TCharactersResult = {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
  results: ICharacter[];
};

export type FgetCharacters = (s: string) => Promise<TCharactersResult>;
export type FgetEpisodes = (qs: string[]) => Promise<Array<IEpisode>>;
export type FgetMatch = (s: string) => string | null;
