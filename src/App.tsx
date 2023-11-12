import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages';
import { DetailCard } from './components';
import { SearchCtxProvider } from './context';
import { CharactersProvider } from './context';
import { useQueryCharacters } from './hooks';

const App: React.FC = () => {
  const { characters } = useQueryCharacters('', 1);

  return (
    <SearchCtxProvider>
      <CharactersProvider initCharacters={characters}>
        <Routes>
          <Route path="/React2023Q4" element={<SearchPage />} />
          <Route path="/" element={<SearchPage />}>
            <Route path="/:characterId" element={<DetailCard />} />
          </Route>
        </Routes>
      </CharactersProvider>
    </SearchCtxProvider>
  );
};

export default App;
