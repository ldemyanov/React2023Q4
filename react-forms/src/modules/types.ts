export interface FormFields {
  name: string,
  age: number,
  email: string,
  password: string,
  confirmPassword: string,
  consentWithRules: true,
  gender: string,
  country: string,
  img: string,
  imgFile?: FileList,
}


export type YupFormErrors = {
  name?: boolean;
  age?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  gender?: boolean;
  consentWithRules?: boolean;
  country?: boolean;
  img?: boolean;
};

export interface YupError {
  path: string;
}