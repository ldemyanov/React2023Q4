import React, { useCallback, useRef, useState } from 'react';
import * as yup from 'yup';
import classes from './style.module.css';

type FormValues = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
};

type YupFormErrors = {
  name?: boolean;
  age?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
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
});

const UncontrolledForm: React.FC = () => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputAgeRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);

  const [formErrors, setFormErrors] = useState<YupFormErrors>({});

  const formSubmit = useCallback(async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const values: FormValues = {
      name: inputNameRef.current?.value ?? '',
      age: Number(inputAgeRef.current?.value ?? 0),
      email: inputEmailRef.current?.value ?? '',
      password: inputPasswordRef.current?.value ?? '',
      confirmPassword: inputConfirmPasswordRef.current?.value ?? '',
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
            Age:{' '}
          </label>
          <input className={classes.input} ref={inputAgeRef} type="number" name="age" />
        </div>
        {formErrors?.age && <p className={classes.error}>not valid</p>}
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="email">
            Email:{' '}
          </label>
          <input className={classes.input} ref={inputEmailRef} type="text" name="email" />
        </div>
        {formErrors?.email && <p className={classes.error}>not valid</p>}
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="password">
            Password:{' '}
          </label>
          <input className={classes.input} ref={inputPasswordRef} type="password" name="password" />
        </div>
        {formErrors?.password && <p className={classes.error}>not valid</p>}
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="confirmPassword">
            Repeat password:{' '}
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

      <input className={classes.button} type="submit" />
    </form>
  );
};

export default UncontrolledForm;
