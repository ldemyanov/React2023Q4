import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux'

import controlledFormReducer from './reducers/controlledFormReducer';
import uncontrolledFormReducer from './reducers/uncontrolledFormReducer';

export const store = configureStore({
  reducer: { 
    controlledForm: controlledFormReducer,
    uncontrolledForm: uncontrolledFormReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;