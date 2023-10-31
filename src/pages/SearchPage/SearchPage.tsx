import React, { useState, useEffect, useCallback } from 'react';
import { Search, CharacterList, Loader } from '../../components';
import { ICharacter } from '../../types';
import { getCharacters } from '../../api/rickandmortyapi';
import { NetworkError } from '../../errors';
import classes from './style.module.scss';

function SearchPage() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>(
    localStorage.getItem('searchQuery') ?? ''
  );

  const setSearchQuery = (str: string) => {
    setSearchString(str);
    localStorage.setItem('searchQuery', str);
  };

  const toSearch = useCallback(async () => {
    setLoading(true);
    setSearchString(searchString.trim());
    try {
      const { results } = await getCharacters(searchString);
      setCharacters(results);
    } catch (error: unknown) {
      setCharacters([]);
      setError(true);
      let message = 'Unknown Error';
      if (error instanceof NetworkError) {
        message = error.status === 404 ? 'Not found' : error.message;
      }
      setMessage(message);
    }
    setLoading(false);
  }, [searchString]);

  useEffect(() => {
    toSearch();
  }, [searchString, toSearch]);

  return (
    <>
      <header className={classes.header}>
        <Search setSearchQuery={setSearchQuery} searchQuery={searchString} />
      </header>

      {!isLoading ? (
        <CharacterList
          characters={characters}
          error={error}
          message={message}
        />
      ) : (
        <div className={classes.loaderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
}

export default SearchPage;
