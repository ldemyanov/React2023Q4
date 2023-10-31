import React from 'react';
import classes from './style.module.scss';
import SearchSVG from '../../assets/search.svg?react';

type SearchProps = {
  searchQuery: string;
  setSearchQuery: (words: string) => void;
  toSearch: () => void;
};

function Search(props: SearchProps) {
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      props.toSearch();
    }
  };

  const getError = () => {
    props.setSearchQuery('Secret Error');
  };

  return (
    <div className={classes.container}>
      <span className={classes.inputBox}>
        <SearchSVG />
        <input
          type="text"
          onChange={(event) => props.setSearchQuery(event.target.value)}
          onKeyDown={keyDownHandler}
          placeholder="Please, input characters name"
          value={props.searchQuery}
        />
      </span>

      <button className={classes.button} onClick={() => props.toSearch()}>
        Search
      </button>

      <button className={classes.button} onClick={getError}>
        Get Error
      </button>
    </div>
  );
}

export default Search;
