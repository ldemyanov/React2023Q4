import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchSlice from './reducers/searchSlice';
import { rickAndMortyApi } from '../services/RickAndMortyService';

const rootReducer = combineReducers({
  search: searchSlice,
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getMiddleware) => getMiddleware().concat(rickAndMortyApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
