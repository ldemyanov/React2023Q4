import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages';
import { DetailCard } from './components';
import { ICharacter, TCharactersContext, TSearchStringContext } from './types';
import { getCharacters } from './api/rickandmortyapi';

const SearchStringContext = createContext<TSearchStringContext>({
  searchString: '',
  updateSearchString: () => {},
});

const CharactersContext = createContext<TCharactersContext>({
  characters: [],
  updateCharacters: () => {},
});

export const useCharactersContext = () => useContext<TCharactersContext>(CharactersContext);
export const useSearchContext = () => useContext<TSearchStringContext>(SearchStringContext);

const App: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [searchString, setSearchString] = useState<string>(
    localStorage.getItem('searchQuery') ?? ''
  );

  const updateSearchString = useCallback((newSearchString: string) => {
    localStorage.setItem('searchQuery', newSearchString);
    setSearchString(newSearchString);
  }, []);

  const updateCharacters = useCallback((characters: ICharacter[]) => {
    setCharacters(characters);
  }, []);

  useEffect(() => {
    async function load() {
      const result = await getCharacters('', '1');
      const resCharacters = result.data.results;
      setCharacters(resCharacters);
    }

    load();
  }, []);

  return (
    <SearchStringContext.Provider value={{ searchString, updateSearchString }}>
      <CharactersContext.Provider value={{ characters, updateCharacters }}>
        <Routes>
          <Route path="/React2023Q4" element={<SearchPage />} />
          <Route path="/" element={<SearchPage />}>
            <Route path="/:characterId" element={<DetailCard />} />
          </Route>
        </Routes>
      </CharactersContext.Provider>
    </SearchStringContext.Provider>
  );
};

export default App;
