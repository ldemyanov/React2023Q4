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
}

export type TCharactersResult = {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
  results: ICharacter[];
};

export type FgetCharacters = (
  queryString: string
) => Promise<TCharactersResult>;
