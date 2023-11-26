import React, { useEffect, useState } from 'react';
import classes from './style.module.scss';
import SelectCountPerPape from '../SelectPagination/SelectCountPerPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSearchString } from '../../store/reducers/searchSlice';

const secret = 'Secret Error 123';

const Search: React.FC = () => {
  const [liveString, setLiveString] = useState<string>('');
  const { searchString } = useAppSelector((s) => s.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const previousString: string = localStorage.getItem('searchString') || '';
    setLiveString(previousString);
  }, []);

  useEffect(() => {
    setLiveString(searchString);
    localStorage.setItem('searchString', searchString);
  }, [searchString]);

  const startSearch = () => dispatch(setSearchString(liveString.trim()));
  const getError = () => dispatch(setSearchString(secret));

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') startSearch();
  };

  if (searchString === secret) {
    throw Error('Click on error button');
  }

  return (
    <div className={classes.searchBlock}>
      <SelectCountPerPape />

      <span className={classes.inputBox}>
        <input
          name="searchString"
          type="text"
          onChange={(event) => setLiveString(event.target.value)}
          onKeyDown={keyDownHandler}
          placeholder="Please, input characters name"
          value={liveString}
        />
      </span>

      <button data-testid="btnStartSearch" className={classes.button} onClick={startSearch}>
        Search
      </button>

      <button className={classes.button} onClick={getError}>
        Get Error
      </button>
    </div>
  );
};

export default Search;
