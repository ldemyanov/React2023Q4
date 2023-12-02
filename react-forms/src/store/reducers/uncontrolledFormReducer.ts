import { createSlice } from '@reduxjs/toolkit';

interface UncotrolledFormFields {
  name: string,
}

const initialState: UncotrolledFormFields = {
  name: "",
};

const uncotrolledFormSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export default uncotrolledFormSlice.reducer;

export const { setName } = uncotrolledFormSlice.actions;

