import React from 'react';
import { CharactersProvider } from '../../context';
import Router from '../../Router';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';

const store = setupStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CharactersProvider initCharacters={[]}>
        <Router />
      </CharactersProvider>
    </Provider>
  );
};

export default App;
