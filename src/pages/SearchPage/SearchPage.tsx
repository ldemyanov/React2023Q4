import React, { useState } from 'react';
import { Search, CharacterList } from '../../components';
import commonClasses from '../../styles/common.module.scss';
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [customStep, setCustomStep] = useState<number>(20);
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
      <header className={commonClasses.header}>
        <Search
          setSearchQuery={setSearchQuery}
          searchQuery={searchString}
          changePage={changePage}
          setStep={setCustomStep}
        />
      </header>
      <div className="flex">
        <CharacterList
          searchString={searchString}
          changePage={changePage}
          customStep={customStep}
        />
      </div>
    </>
  );
}

export default SearchPage;
