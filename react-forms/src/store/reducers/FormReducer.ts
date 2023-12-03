import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { defaultImage } from '../../modules/image';
import { FormFields } from '../../modules/types';

const initialState: FormFields = {
  name: "",
  age: 0,
  email: "",
  password: "",
  gender: "",
  country: "",
  img: defaultImage,
  confirmPassword: "",
  consentWithRules: true,
};

const FormSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormFields>) => {
      const { name, age, country, email, gender, password, img } = action.payload;
      state.name = name;
      state.age = age;
      state.country = country;
      state.email = email;
      state.gender = gender;
      state.password = password;
      state.img = img;
    }
  },
});

export default FormSlice.reducer;

export const { setFormData } = FormSlice.actions;

