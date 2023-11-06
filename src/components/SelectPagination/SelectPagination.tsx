import React from 'react';
import Select from 'react-select';

export type PaginationStep = {
  value: number;
  label: string;
};

export interface PaginationStepState {
  option: PaginationStep | null;
}

export const options: PaginationStep[] = [
  { value: 20, label: '20 cards' },
  { value: 10, label: '10 cards' },
];

type SelectPaginationProps = {
  setOption: React.Dispatch<React.SetStateAction<PaginationStepState>>;
};

const SelectPagination: React.FC<SelectPaginationProps> = ({ setOption }) => {
  return (
    <div className="h-10">
      <Select
        styles={{
          control: (baseStyles, { isFocused }) => ({
            ...baseStyles,
            borderColor: isFocused ? 'rgba(238, 238, 238, 0.5)' : 'rgba(238, 238, 238, 0.3)',
            borderWidth: '2px',
            backgroundColor: '#222',
            boxShadow:
              '0px 6px 30px 0px rgba(238, 238, 238, 0.1), 0px -6px 30px 0px rgba(238, 238, 238, 0.1)',
            '&:hover': {
              borderColor: 'rgba(238, 238, 238, 0.5)',
            },
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: 'rgb(209, 213, 219)',
            lineHeight: 2,
          }),
          indicatorSeparator: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: 'rgba(238, 238, 238, 0.3)',
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            height: '90px',
            backgroundColor: '#222',
          }),
          option: (baseStyles, { isSelected }) => ({
            ...baseStyles,
            height: '40px',
            backgroundColor: isSelected ? '#555' : '#222',
            color: 'rgb(209, 213, 219)',
            cursor: 'pointer',
          }),
        }}
        options={options}
        defaultValue={options[0]}
        onChange={(option: PaginationStep | null) => {
          setOption({ option });
        }}
      />
    </div>
  );
};

export default SelectPagination;
