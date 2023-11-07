import React, { useState, createContext } from 'react';
import { Search, CharacterList, Blocker } from '../../components';
import commonClasses from '../../styles/common.module.scss';
import { useSearchParams, Outlet } from 'react-router-dom';
import { PaginationStepState, options } from '../../components/SelectPagination/SelectPagination';
import { ICharacter } from '../../types';

type TCharactersContext = {
  characters: ICharacter[];
  updateCharacters: (characters: ICharacter[]) => void;

  searchString: string;
  updateSearchString: (searchString: string) => void;

  pagination: PaginationStepState;
  togglePagination: (paginationParam: React.SetStateAction<PaginationStepState>) => void;

  page: number;
  togglePage: (page: number) => void;
};

const CharactersContext = createContext<TCharactersContext | null>(null);

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
          <Search
            setSearchQuery={setSearchQuery}
            searchQuery={searchString}
            changePage={changePage}
            updatePagination={updatePagination}
          />
        </header>
        <div className="flex w-fit">
          <CharacterList
            searchString={searchString}
            changePage={changePage}
            pagination={pagination}
          />
          <Outlet />
        </div>
      </div>
    </CharactersContext.Provider>
  );
};

export default SearchPage;
