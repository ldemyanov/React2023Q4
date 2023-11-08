import React, { useState, createContext } from 'react';
import { Search, CharacterList, Blocker } from '../../components';
import commonClasses from '../../styles/common.module.scss';
import { useSearchParams, Outlet } from 'react-router-dom';
import { options } from '../../components/SelectPagination/SelectPagination';
import { ICharacter, TCharactersContext, PaginationStepState } from '../../types';

export const CharactersContext = createContext<TCharactersContext>({
  characters: [],
  updateCharacters: () => {},

  searchString: '',
  updateSearchString: () => {},

  pagination: { option: options[0] },
  togglePagination: () => {},

  page: 1,
  togglePage: () => {},
});

const SearchPage: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<PaginationStepState>({ option: options[0] });
  const [page, setPage] = useState<number>(1);
  const [searchString, setSearchString] = useState<string>(
    localStorage.getItem('searchQuery') ?? ''
  );

  const setSearchQuery = (str: string) => {
    setSearchString(str);
    localStorage.setItem('searchQuery', str);
  };

  const changePage = (page: number) => {
    setPage(page);
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  const updatePagination = (paginationParam: React.SetStateAction<PaginationStepState>) => {
    changePage(1);
    setPagination(paginationParam);
  };

  const updateCharacters = (characters: ICharacter[]) => {
    setCharacters(characters);
  };

  return (
    <CharactersContext.Provider
      value={{
        characters,
        updateCharacters,
        searchString,
        updateSearchString: setSearchQuery,
        pagination,
        togglePagination: updatePagination,
        page,
        togglePage: changePage,
      }}
    >
      <Blocker />
      <div className={commonClasses.container}>
        <header className={commonClasses.header}>
          <Search />
        </header>
        <div className="flex w-fit">
          <CharacterList />
          <Outlet />
        </div>
      </div>
    </CharactersContext.Provider>
  );
};

export default SearchPage;
