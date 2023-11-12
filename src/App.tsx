import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages';
import { DetailCard } from './components';
import { SearchCtxProvider } from './context';
import { CharactersProvider } from './context';

const App: React.FC = () => {
  return (
    <SearchCtxProvider>
      <CharactersProvider initCharacters={[]}>
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
