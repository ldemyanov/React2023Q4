// import React, { createContext, useCallback, useEffect, useState } from 'react';
// import { options } from '../../components/SelectPagination/SelectPagination';
// import { ICharacter, PaginationStepState, TCharactersContext } from '../../types';
// import { useSearchParams } from 'react-router-dom';

// export const CharactersContext = createContext<TCharactersContext>({
//   characters: [],
//   updateCharacters: () => {},

//   searchString: '',
//   updateSearchString: () => {},

//   pagination: { option: options[0] },
//   togglePagination: () => {},

//   page: 1,
//   togglePage: () => {},
// });

// const SearchPageCtx: React.FC<{ children: JSX.Element }> = ({ children }) => {
//   const [characters, setCharacters] = useState<ICharacter[]>([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [pagination, setPagination] = useState<PaginationStepState>({ option: options[0] });
//   const [page, setPage] = useState<number>(1);
//   const [searchString, setSearchString] = useState<string>(
//     localStorage.getItem('searchQuery') ?? ''
//   );

//   const updateSearchString = (str: string) => {
//     setSearchString(str);
//     localStorage.setItem('searchQuery', str);
//   };

//   const togglePage = (page: number) => {
//     setPage(page);
//     searchParams.set('page', String(page));
//     setSearchParams(searchParams);
//   };

//   const togglePagination = (paginationParam: React.SetStateAction<PaginationStepState>) => {
//     togglePage(1);
//     setPagination(paginationParam);
//   };

//   const updateCharacters = useCallback((characters: ICharacter[]) => {
//     setCharacters(characters);
//   }, []);

//   return (
//     <CharactersContext.Provider
//       value={{
//         characters,
//         updateCharacters,
//         searchString,
//         updateSearchString,
//         pagination,
//         togglePagination,
//         page,
//         togglePage,
//       }}
//     >
//       {children}
//     </CharactersContext.Provider>
//   );
// };

// export default SearchPageCtx;
