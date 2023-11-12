import React, { useEffect, useState } from 'react';
import classes from './style.module.scss';
import { useSearchCtx } from '../../context';
// import SearchSVG from '../../assets/search.svg?react';

const Search: React.FC = () => {
  const [liveString, setLiveString] = useState<string>('');
  const { searchString, updateSearchString } = useSearchCtx();

  useEffect(() => {
    setLiveString(searchString);
  }, [searchString]);

  const startSearch = () => {
    updateSearchString(liveString.trim());
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') startSearch();
  };

  const getError = () => {
    updateSearchString('Secret Error');
  };

  if (searchString === 'Secret Error') {
    throw Error('Click on error button');
  }

  return (
    <div className={classes.searchBlock}>
      <span className={classes.inputBox}>
        {/* <SearchSVG /> */} s
        <input
          type="text"
          onChange={(event) => setLiveString(event.target.value)}
          onKeyDown={keyDownHandler}
          placeholder="Please, input characters name"
          value={liveString}
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
