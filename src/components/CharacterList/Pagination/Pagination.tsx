import React from 'react';
import { useSearchCtx } from '../../../context';
import { useSearchParams } from 'react-router-dom';
// import { ReactComponent as LeftSquareSvg } from '../../../assets/leftSquare.svg';
// import { ReactComponent as RightSquareSvg } from '../../../assets/rightSquare.svg';
// import LeftSquareSvg from '../../../assets/leftSquare.svg?react';
// import RightSquareSvg from '../../../assets/rightSquare.svg?react';

type TPagination = {
  count: number;
};

const Pagination: React.FC<TPagination> = ({ count }) => {
  const { page, setPage, perPageElements } = useSearchCtx();
  const [searchParams, setSearchParams] = useSearchParams();

  const updatePage = (page: number) => {
    setPage(page);
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  return (
    <div className="flex justify-center text-slate-100 my-5">
      <button
        data-testid="left"
        className={page > 1 ? 'mx-2 fill-stone-500' : 'mx-2 invisible'}
        onClick={() => updatePage(page - 1)}
      >
        {/* <LeftSquareSvg /> */}
        to left
      </button>
      <span className="mx-2 text-stone-200">{page}</span>
      <button
        data-testid="rigth"
        className={page <= count / perPageElements ? 'mx-2 fill-stone-500' : 'mx-2 invisible'}
        onClick={() => updatePage(page + 1)}
      >
        {/* <RightSquareSvg /> */}
        to right
      </button>
    </div>
  );
};

export default Pagination;
