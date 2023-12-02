import { createSlice } from '@reduxjs/toolkit';

interface CotrolledFormFields {
  name: string,
}

const initialState: CotrolledFormFields = {
  name: "",
};

const cotrolledFormSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export default cotrolledFormSlice.reducer;

export const { setName } = cotrolledFormSlice.actions;
