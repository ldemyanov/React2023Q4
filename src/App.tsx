import React from 'react';
import { SearchCtxProvider } from './context';
import { CharactersProvider } from './context';
import Router from './Router';

const App: React.FC = () => {
  return (
    <SearchCtxProvider>
      <CharactersProvider initCharacters={[]}>
        <Router />
      </CharactersProvider>
    </SearchCtxProvider>
  );
};

export default App;
