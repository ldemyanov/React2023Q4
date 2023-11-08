import React, { useContext } from 'react';
import { TCharactersContext } from '../../../types';
import { CharactersContext } from '../../../pages/SearchPage/SearchPage';
import LeftSquareSvg from '../../../assets/leftSquare.svg?react';
import RightSquareSvg from '../../../assets/rightSquare.svg?react';

const Pagination: React.FC<{ count: number; pageStep: number }> = ({ count, pageStep }) => {
  const { togglePage, page } = useContext<TCharactersContext>(CharactersContext);

  return (
    <div className="flex justify-center text-slate-100 my-5">
      <button
        className={page > 1 ? 'mx-2 fill-stone-500' : 'mx-2 invisible'}
        onClick={() => togglePage(page - 1)}
      >
        <LeftSquareSvg />
      </button>
      <span className="mx-2 text-stone-200">{page}</span>
      <button
        className={page <= count / pageStep ? 'mx-2 fill-stone-500' : 'mx-2 invisible'}
        onClick={() => togglePage(page + 1)}
      >
        <RightSquareSvg />
      </button>
    </div>
  );
};

export default Pagination;
