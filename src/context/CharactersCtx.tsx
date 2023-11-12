import { ReactNode, createContext, useState, useContext, FC, useCallback } from 'react';
import { ICharacter } from '../types';

type TCharactersCtx = {
  characters: ICharacter[];
  updateCharacters: (characters: ICharacter[]) => void;
};

const CharactersCtx = createContext<TCharactersCtx>({
  characters: [],
  updateCharacters: () => {},
});

export const CharactersProvider: FC<{ children: ReactNode; initCharacters?: ICharacter[] }> = ({
  children,
  initCharacters = [],
}) => {
  const [characters, setCharacters] = useState<ICharacter[]>(initCharacters);

  const updateCharacters = useCallback((newCharacters: ICharacter[]) => {
    setCharacters(newCharacters);
  }, []);

  return (
    <CharactersCtx.Provider value={{ characters, updateCharacters }}>
      {children}
    </CharactersCtx.Provider>
  );
};

export const useCharachers = () => useContext(CharactersCtx);
