import React, { useState, useEffect, useCallback } from 'react';
import { Search, CharacterList, Loader } from '../../components';
import { ICharacter } from '../../types';
import { getCharacters } from '../../api/rickandmortyapi';
import { NetworkError } from '../../errors';
import commonClasses from '../../styles/common.module.scss';
import { DetailCard } from '../../components/DetailCard';

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
      <header className={commonClasses.header}>
        <Search setSearchQuery={setSearchQuery} searchQuery={searchString} />
      </header>
      {!isLoading ? (
        <div className="flex">
          <CharacterList
            characters={characters}
            error={error}
            message={message}
          />
          {characters[0] && <DetailCard character={characters[0]} />}
        </div>
      ) : (
        <div className={commonClasses.loaderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
}

export default SearchPage;
