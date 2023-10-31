import React, { useState } from 'react';
import classes from './style.module.scss';
import SearchSVG from '../../assets/search.svg?react';

type SearchProps = {
  searchQuery: string;
  setSearchQuery: (words: string) => void;
};

function Search(props: SearchProps) {
  const [searchString, setSearchString] = useState<string>(props.searchQuery);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      props.setSearchQuery(searchString.trim());
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
          onChange={(event) => setSearchString(event.target.value)}
          onKeyDown={keyDownHandler}
          placeholder="Please, input characters name"
          value={searchString}
        />
      </span>

      <button
        className={classes.button}
        onClick={() => props.setSearchQuery(searchString.trim())}
      >
        Search
      </button>

      <button className={classes.button} onClick={getError}>
        Get Error
      </button>
    </div>
  );
}

export default Search;
