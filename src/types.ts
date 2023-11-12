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

// export type TCharactersContext = {
//   characters: ICharacter[];
//   updateCharacters: (characters: ICharacter[]) => void;

//   searchString: string;
//   updateSearchString: (searchString: string) => void;

//   pagination: PaginationStepState;
//   togglePagination: (paginationParam: React.SetStateAction<PaginationStepState>) => void;

//   page: number;
//   togglePage: (page: number) => void;
// };

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

export type TSearchStringContext = {
  searchString: string;
  updateSearchString: (searchString: string) => void;
};

export type TCharactersContext = {
  characters: ICharacter[];
  updateCharacters: (characters: ICharacter[]) => void;
};
