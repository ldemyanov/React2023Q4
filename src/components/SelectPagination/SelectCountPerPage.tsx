import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setPerPageElements } from '../../store/reducers/searchSlice';

const SelectCountPerPape: React.FC = () => {
  const { perPageElements } = useAppSelector((s) => s.search);
  const dispatch = useAppDispatch();

  const toogleSelectValue: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const perPageElements = Number(event.target.value);
    if (perPageElements === 10 || perPageElements === 20) {
      dispatch(setPerPageElements(perPageElements));
    }
  };

  return (
    <select value={perPageElements} onChange={toogleSelectValue}>
      <option value="20">20 cards</option>
      <option value="10">10 cards</option>
    </select>
  );
};

export default SelectCountPerPape;
