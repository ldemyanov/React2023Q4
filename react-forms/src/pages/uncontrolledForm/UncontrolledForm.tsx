import React, { useCallback, useRef, useState } from 'react';
import * as yup from 'yup';
import classes from './style.module.css';
import { useAppSelector } from '../../store/reduxStore';
import { convertImageToBase64 } from '../../modules/image';

type FormValues = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  consentWithRules: boolean;
  country: string;
  img?: string;
};

type YupFormErrors = {
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

interface YupError {
  path: string;
}

const formSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().moreThan(1).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .required()
    .oneOf([yup.ref('password')]),
  gender: yup.string().required(),
  consentWithRules: yup.boolean().isTrue(),
  country: yup.string().required(),
});


const UncontrolledForm: React.FC = () => {
  const { countries } = useAppSelector((state) => state.countries);

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputAgeRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);
  const inputGenderRef = useRef<string>('');
  const inputTCRef = useRef<HTMLInputElement>(null);
  const inputCountryRef = useRef<HTMLSelectElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [formErrors, setFormErrors] = useState<YupFormErrors>({});

  const changeImgFile = async (event: React.BaseSyntheticEvent) => {
    const base64Image = (await convertImageToBase64(event.target.files[0])) as string;
    imgRef.current?.setAttribute("src", base64Image);
  };

  const changeGender = useCallback((event: React.BaseSyntheticEvent) => {
    inputGenderRef.current = event.target.value;
  }, []);

  const formSubmit = useCallback(async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const values: FormValues = {
      name: inputNameRef.current?.value ?? '',
      age: Number(inputAgeRef.current?.value ?? 0),
      email: inputEmailRef.current?.value ?? '',
      password: inputPasswordRef.current?.value ?? '',
      confirmPassword: inputConfirmPasswordRef.current?.value ?? '',
      gender: inputGenderRef.current ?? '',
      consentWithRules: !!inputTCRef.current?.checked,
      country: inputCountryRef.current?.value ?? '',
      img: imgRef.current?.src ?? '',
    };

    const isFormValid = await formSchema.isValid(values, {
      abortEarly: false,
    });

    if (isFormValid) {
      setFormErrors({});
    } else {
      formSchema.validate(values, { abortEarly: false }).catch((errors) => {
        const yupErrors: YupFormErrors = errors.inner.reduce(
          (acc: YupFormErrors, error: YupError) => ({
            ...acc,
            [error.path]: true,
          }),
          {}
        );
        setFormErrors(yupErrors);
      });
    }
  }, []);

  return (
    <form className={classes.form} onSubmit={formSubmit}>
      <h2 className={classes.title}>Uncontrolled Form</h2>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="name">
            Name:
          </label>
          <input className={classes.input} ref={inputNameRef} type="text" name="name" />
        </div>
        {formErrors?.name && <p className={classes.error}>not valid</p>}
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="age">
            Age:
          </label>
          <input className={classes.input} ref={inputAgeRef} type="number" name="age" />
        </div>
        {formErrors?.age && <p className={classes.error}>not valid</p>}
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="email">
            Email:
          </label>
          <input className={classes.input} ref={inputEmailRef} type="text" name="email" />
        </div>
        {formErrors?.email && <p className={classes.error}>not valid</p>}
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="password">
            Password:
          </label>
          <input className={classes.input} ref={inputPasswordRef} type="password" name="password" />
        </div>
        {formErrors?.password && <p className={classes.error}>not valid</p>}
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="confirmPassword">
            Repeat password:
          </label>
          <input
            className={classes.input}
            ref={inputConfirmPasswordRef}
            type="password"
            name="confirmPassword"
          />
        </div>
        {formErrors?.confirmPassword && <p className={classes.error}>not valid</p>}
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="sex">
            Gender:
          </label>
          <div className={classes.radioControl} onChange={changeGender}>
            <input className={classes.radio} type="radio" name="sex" value="woman" />
            <label htmlFor="woman">Woman</label>
            <input className={classes.radio} type="radio" name="sex" value="man" />
            <label htmlFor="man">Man</label>
          </div>
        </div>
        {formErrors?.gender && <p className={classes.error}>not valid</p>}
      </div>

      <div className={classes.questionBox}>
        <label className={classes.label} htmlFor="tc">
          Accept T&C:
        </label>
        <input ref={inputTCRef} type="checkbox" name="tc" id="" />
        {formErrors?.consentWithRules && <p className={classes.error}>not valid</p>}
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="country">
            Country:
          </label>
          <select className={classes.select} ref={inputCountryRef} name="country">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        {formErrors?.country && <p className={classes.error}>not valid</p>}
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="image">
            Image:
          </label>
          <img ref={imgRef} className={classes.img} src="https://fakeimg.pl/250x250/?text=Photo&font=lobster" alt="" />
          <input type="file" onChange={changeImgFile}></input>
        </div>
        {formErrors?.img && <p className={classes.error}>not valid image</p>}
      </div>

      <input className={classes.button} type="submit" />
    </form>
  );
};

export default UncontrolledForm;
