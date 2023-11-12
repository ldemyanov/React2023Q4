// import React, { useContext } from 'react';
// import { TCharactersContext } from '../../../types';
// import { CharactersContext } from '../../../pages/SearchPage/SearchPageCtx';
// import { SelectPagination } from '../../SelectPagination';
// // import { ReactComponent as LeftSquareSvg } from '../../../assets/leftSquare.svg';
// // import { ReactComponent as RightSquareSvg } from '../../../assets/rightSquare.svg';
// // import LeftSquareSvg from '../../../assets/leftSquare.svg?react';
// // import RightSquareSvg from '../../../assets/rightSquare.svg?react';

// type TPagination = {
//   count: number;
//   pageStep: number;
//   pagination: number;
//   togglePagination: number;
// };

// const Pagination: React.FC<TPagination> = ({ count, pageStep, togglePagination, pagination }) => {

//   return (
//     <div className="flex justify-center text-slate-100 my-5">
//       <button
//         className={page > 1 ? 'mx-2 fill-stone-500' : 'mx-2 invisible'}
//         onClick={() => togglePage(page - 1)}
//       >
//         {/* <LeftSquareSvg /> */}
//         to left
//       </button>
//       <span className="mx-2 text-stone-200">{page}</span>
//       <button
//         className={page <= count / pageStep ? 'mx-2 fill-stone-500' : 'mx-2 invisible'}
//         onClick={() => togglePage(page + 1)}
//       >
//         {/* <RightSquareSvg /> */}
//         to right
//       </button>
//       <SelectPagination togglePagination={togglePagination} />
//     </div>
//   );
// };

// export default Pagination;
