import React from 'react';
import { useSearchCtx } from '../../context';

const SelectCountPerPape: React.FC = () => {
  const { perPageElements, setPerPageElemetns, setPage } = useSearchCtx();

  const toogleSelectValue: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setPerPageElemetns(Number(event.target.value));
    setPage(1);
  };

  return (
    <select value={perPageElements} onChange={toogleSelectValue}>
      <option value="20">20 cards</option>
      <option value="10">10 cards</option>
    </select>
  );
};

export default SelectCountPerPape;
