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

function Search(props: SearchProps) {
  const [searchString, setSearchString] = useState<string>(props.searchQuery);

  const startSearch = () => {
    props.setSearchQuery(searchString.trim());
    props.changePage(1);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') startSearch();
  };

  const getError = () => {
    props.setSearchQuery('Secret Error');
  };

  if (props.searchQuery === 'Secret Error') {
    throw Error('Click on error button');
  }

  return (
    <div className={classes.searchBlock}>
      <SelectPagination setOption={props.setPagination} />

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
}

export default Search;
