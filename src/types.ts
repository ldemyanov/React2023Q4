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

export type TCharactersResult = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: ICharacter[];
};

export type FgetEpisodes = (qs: string[]) => Promise<Array<IEpisode>>;

export type FgetMatch = (s: string) => string | null;

export type PaginationStep = {
  value: number;
  label: string;
};

export interface PaginationStepState {
  option: PaginationStep | null;
}

export type SelectPaginationProps = {
  setOption: React.Dispatch<React.SetStateAction<PaginationStepState>>;
};
