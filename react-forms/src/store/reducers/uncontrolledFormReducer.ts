import { createSlice } from '@reduxjs/toolkit';

interface UncotrolledFormFields {
  name: string,
  age: number,
  email: string,
  password: string,
  gender: string,
  country: string,
  img: string,
}

const initialState: UncotrolledFormFields = {
  name: "",
  age: 0,
  email: "",
  password: "",
  gender: "",
  country: "",
  img: "",
};

const uncotrolledFormSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setFormObject: (state, action) => {
      state = action.payload;
    }
  },
});

export default uncotrolledFormSlice.reducer;

export const { setName, setFormObject } = uncotrolledFormSlice.actions;

