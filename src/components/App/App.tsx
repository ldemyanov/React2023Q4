import React from 'react';
import Router from '../../Router';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';

const store = setupStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
