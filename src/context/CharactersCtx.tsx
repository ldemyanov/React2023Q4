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

const CharactersCtx = createContext<ICharacter[]>([]);

const DispatchCharactersCtx = createContext<DispatchCharactersCtx>(null);

export const CharactersProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [persons, setPersons] = useState<ICharacter[]>([]);

  return (
    <CharactersCtx.Provider value={persons}>
      <DispatchCharactersCtx.Provider value={setPersons}>{children}</DispatchCharactersCtx.Provider>
    </CharactersCtx.Provider>
  );
};

export const usePersonsDispatch = () => {
  const setCharacters = useContext(DispatchCharactersCtx);

  if (!setCharacters) {
    throw new Error('usePersonsDispatch has to be used within <PersonsDispatchContext.Provider>');
  }

  return setCharacters;
};

export const usePersonsCtx = () => useContext<ICharacter[]>(CharactersCtx);
