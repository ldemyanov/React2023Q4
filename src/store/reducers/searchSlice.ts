import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchState {
  searchString: string;
  page: number;
  perPageElements: 10 | 20;
  countPages: number;
}

const initialState: SearchState = {
  searchString: '',
  page: 1,
  perPageElements: 20,
  countPages: 10,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      if (action.payload > 0 && action.payload < state.countPages) {
        state.page = action.payload;
      }
    },
    toLeft(state) {
      if (state.page - 1 > 0) {
        state.page -= 1;
      }
    },
    toRight(state) {
      if (state.page + 1 < state.countPages) {
        state.page += 1;
      }
    },
    setPerPageElements(state, action: PayloadAction<10 | 20>) {
      state.perPageElements = action.payload;
      state.page = 1;
    },
    setSearchString(state, action: PayloadAction<string>) {
      const newString = action.payload.trim();
      if (newString) {
        state.searchString = newString;
        localStorage.setItem('searchString', newString);
      }
    },
    setCountPages(state, action: PayloadAction<number>) {
      state.countPages = action.payload;
    },
  },
});

export const { setPage, toLeft, toRight, setPerPageElements, setSearchString, setCountPages } =
  searchSlice.actions;

export default searchSlice.reducer;
