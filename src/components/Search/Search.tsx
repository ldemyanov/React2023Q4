import React, { useState } from 'react';
import classes from './style.module.scss';
import SearchSVG from '../../assets/search.svg?react';
import SelectPagination, { PaginationStepState } from '../SelectPagination/SelectPagination';

type SearchProps = {
  searchQuery: string;
  setSearchQuery: (words: string) => void;
  changePage: (page: number) => void;
  setPagination: React.Dispatch<React.SetStateAction<PaginationStepState>>;
};

const Search: React.FC<SearchProps> = ({
  searchQuery,
  setSearchQuery,
  changePage,
  setPagination,
}) => {
  const [searchString, setSearchString] = useState<string>(searchQuery);

  const startSearch = () => {
    setSearchQuery(searchString.trim());
    changePage(1);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') startSearch();
  };

  const getError = () => {
    setSearchQuery('Secret Error');
  };

  if (searchQuery === 'Secret Error') {
    throw Error('Click on error button');
  }

  return (
    <div className={classes.searchBlock}>
      <SelectPagination setOption={setPagination} />

      <span className={classes.inputBox}>
        <SearchSVG />
        <input
          type="text"
          onChange={(event) => setSearchString(event.target.value)}
          onKeyDown={keyDownHandler}
          placeholder="Please, input characters name"
          value={searchString}
        />
      </span>

      <button className={classes.button} onClick={startSearch}>
        Search
      </button>

      <button className={classes.button} onClick={getError}>
        Get Error
      </button>
    </div>
  );
};

export default Search;
