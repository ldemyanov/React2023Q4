import React, { useContext, useEffect, useState } from 'react';
import classes from './style.module.scss';
import SearchSVG from '../../assets/search.svg?react';
import SelectPagination from '../SelectPagination/SelectPagination';
import { CharactersContext } from '../../pages/SearchPage/SearchPage';
import { TCharactersContext } from '../../types';

const Search: React.FC = () => {
  const [liveString, setLiveString] = useState<string>('');
  const context = useContext<TCharactersContext>(CharactersContext);

  useEffect(() => {
    setLiveString(context.searchString);
  }, [context.searchString]);

  const startSearch = () => {
    context.updateSearchString(liveString.trim());
    context.togglePage(1);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') startSearch();
  };

  const getError = () => {
    context.updateSearchString('Secret Error');
  };

  if (context.searchString === 'Secret Error') {
    throw Error('Click on error button');
  }

  return (
    <div className={classes.searchBlock}>
      <SelectPagination setOption={context.togglePagination} />

      <span className={classes.inputBox}>
        <SearchSVG />
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
