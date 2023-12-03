// Poland Finland Sweden Switzerland Belgium Portugal

import { createSlice } from '@reduxjs/toolkit';

interface CountriesFields {
  countries: string[],
}

const initialState: CountriesFields = {
  countries: [
    "Poland",
    "Finland",
    "Sweden",
    "Switzerland",
    "Belgium",
    "Portugal",
  ]
};

const countriesSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {}
});

export default countriesSlice.reducer;
