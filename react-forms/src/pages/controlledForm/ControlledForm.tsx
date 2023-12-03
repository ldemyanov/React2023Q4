import { SubmitHandler, useForm } from 'react-hook-form';
import { FormFields } from '../../modules/types';
import { useAppDispatch, useAppSelector } from '../../store/reduxStore';
import React, { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import classes from '../../styles/form.module.css';
import StyledSelect from './StyledSelect';
import { convertImageToBase64, defaultImage } from '../../modules/image';
import { availableGenders } from '../../modules/gender';
import { formSchema } from '../../modules/validation';
import { ErrorMessage } from '@hookform/error-message';
import { setFormData } from '../../store/reducers/FormReducer';

const ControlledForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      img: defaultImage,
    },
  });

  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);

  const submit: SubmitHandler<FormFields> = async (data) => {
    if (data.imgFile && data.imgFile.length > 0) {
      const file = data.imgFile[0];
      const base64Img = (await convertImageToBase64(file)) as string;
      data.img = base64Img;
    }
    dispatch(setFormData(data));
  };

  const availableCountries = useMemo(() => {
    return countries.map((country) => ({
      value: country,
      label: country,
    }));
  }, [countries]);

  return (
    <form className={classes.form} onSubmit={handleSubmit(submit)}>
      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="name">
            Name:
          </label>
          <input className={classes.input} type="text" {...register('name')} />
        </div>
        <ErrorMessage className={classes.error} errors={errors} name="name" as="p" />
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="age">
            Age:
          </label>
          <input className={classes.input} type="number" {...register('age')} />
        </div>
        <ErrorMessage className={classes.error} errors={errors} name="age" as="p" />
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="email">
            Email:
          </label>
          <input className={classes.input} type="email" {...register('email')} />
        </div>
        <ErrorMessage className={classes.error} errors={errors} name="email" as="p" />
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="password">
            Password:
          </label>
          <input className={classes.input} type="password" {...register('password')} />
        </div>
        <ErrorMessage className={classes.error} errors={errors} name="password" as="p" />
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="confirmPassword">
            Confirm password:
          </label>
          <input className={classes.input} type="password" {...register('confirmPassword')} />
        </div>
        <ErrorMessage className={classes.error} errors={errors} name="confirmPassword" as="p" />
      </div>

      <div className={classes.questionBox}>
        <input type="checkbox" {...register('consentWithRules')} />
        <label className={classes.label} htmlFor="consentWithRules">
          Accept T&C:
        </label>
        <ErrorMessage className={classes.error} errors={errors} name="consentWithRules" as="p" />
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="imgFile">
            Image:
          </label>
          <input type="file" {...register('imgFile')} />
        </div>
        <ErrorMessage className={classes.error} errors={errors} name="imgFile" as="p" />
        <ErrorMessage className={classes.error} errors={errors} name="img" as="p" />
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="country">
            Country:
          </label>
          <div style={{ width: '343px', marginTop: '5px' }}>
            <StyledSelect name="country" control={control} selectOptions={availableCountries} />
          </div>
        </div>
        <ErrorMessage className={classes.error} errors={errors} name="country" as="p" />
      </div>

      <div className={classes.questionBox}>
        <div className={classes.question}>
          <label className={classes.label} htmlFor="gender">
            Gender:
          </label>
          <div style={{ width: '343px', marginTop: '5px' }}>
            <StyledSelect name="gender" control={control} selectOptions={availableGenders} />
          </div>
        </div>
        <ErrorMessage className={classes.error} errors={errors} name="gender" as="p" />
      </div>

      <button className={classes.button}>Send</button>
    </form>
  );
};

export default ControlledForm;
