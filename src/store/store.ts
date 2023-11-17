import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchSlice from './reducers/searchSlice';

const rootReducer = combineReducers({
  search: searchSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
