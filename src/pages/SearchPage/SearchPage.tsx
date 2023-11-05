import React, { useState } from 'react';
import { Search, CharacterList, Blocker } from '../../components';
import commonClasses from '../../styles/common.module.scss';
import { useSearchParams, Outlet } from 'react-router-dom';
import { PaginationStepState, options } from '../../components/SelectPagination/SelectPagination';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<PaginationStepState>({
    option: options[0],
  });
  const [searchString, setSearchString] = useState<string>(
    localStorage.getItem('searchQuery') ?? ''
  );

  const setSearchQuery = (str: string) => {
    setSearchString(str);
    localStorage.setItem('searchQuery', str);
  };

  const changePage = (num: number) => {
    searchParams.set('page', String(num));
    setSearchParams(searchParams);
  };

  return (
    <>
      <Blocker />
      <div className={commonClasses.container}>
        <header className={commonClasses.header}>
          <Search
            setSearchQuery={setSearchQuery}
            searchQuery={searchString}
            changePage={changePage}
            setPagination={setPagination}
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
    </>
  );
}

export default SearchPage;
