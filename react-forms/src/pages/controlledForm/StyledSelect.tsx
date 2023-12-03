import React from 'react';
import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';
import { FormFields } from '../../modules/types';

type StyledSelectProps = {
  control: Control<FormFields>;
  selectOptions: {
    value: string;
    label: string;
  }[];
  name: 'gender' | 'country';
};

const StyledSelect: React.FC<StyledSelectProps> = ({ control, selectOptions, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref } }) => (
        <Select
          ref={ref}
          options={selectOptions}
          value={selectOptions.find((c) => c.value === value)}
          onChange={(val) => onChange(val?.value)}
          placeholder={`Select ${name}`}
          styles={{
            control: (baseStyles, { isFocused }) => ({
              ...baseStyles,
              borderColor: isFocused ? 'rgb(70, 90, 110)' : 'rgb(42, 57, 78)',
              borderWidth: '1px',
              color: 'rgba(255, 255, 255, 0.87)',
              backgroundColor: 'rgb(10, 14, 20)',
              boxShadow: 'none',
              '&:hover': {
                borderColor: 'rgb(42, 57, 78)',
              },
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: 'rgba(255, 255, 255, 0.87)',
              lineHeight: 2,
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: 'rgba(10, 14, 20, 0.3)',
            }),
            menuList: (baseStyles) => ({
              ...baseStyles,
              maxHeight: '170px',
              backgroundColor: 'rgb(20, 27, 37)',
            }),
            option: (baseStyles, { isSelected }) => ({
              ...baseStyles,
              height: '40px',
              backgroundColor: isSelected ? 'rgb(40, 53, 71)' : 'rgb(20, 27, 37)',
              color: 'rgba(255, 255, 255, 0.87)',
              cursor: 'pointer',
            }),
          }}
        />
      )}
    />
  );
};

export default StyledSelect;
