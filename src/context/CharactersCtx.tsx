import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  useContext,
  FC,
} from 'react';
import { ICharacter } from '../types';

type DispatchCharactersCtx = Dispatch<SetStateAction<ICharacter[]>> | null;

const CharactersCtx = createContext<{
  characters: ICharacter[];
  setCharacters: (r: ICharacter[]) => void;
}>({
  characters: [],
  setCharacters: () => undefined,
});

const DispatchCharactersCtx = createContext<DispatchCharactersCtx>(null);

export const CharactersProvider: FC<{ children: ReactNode; initCharacters?: ICharacter[] }> = ({
  children,
  initCharacters = [],
}) => {
  const [characters, setCharacters] = useState<ICharacter[]>(initCharacters);

  const value = {
    characters,
    setCharacters,
  };

  return (
    <CharactersCtx.Provider value={value}>
      <DispatchCharactersCtx.Provider value={setCharacters}>
        {children}
      </DispatchCharactersCtx.Provider>
    </CharactersCtx.Provider>
  );
};

export const useCharachers = () => useContext(CharactersCtx);
