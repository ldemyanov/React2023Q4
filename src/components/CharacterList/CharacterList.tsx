import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import commonClasses from '../../styles/common.module.scss';
import classes from './stye.module.scss';
import { CharacterCard } from './CharacterCard';
import { getCharacters } from '../../api/rickandmortyapi';
import { TCharactersContext } from '../../types';
import { Loader } from '..';
import { CharactersContext } from '../../pages/SearchPage/SearchPage';
import { Pagination } from './Pagination';

const CharacterList: React.FC = () => {
  const { pagination, characters, updateCharacters, searchString, page } =
    useContext<TCharactersContext>(CharactersContext);

  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const pageStepRef = useRef<number>(pagination.option?.value || 20);

  useEffect(() => {
    async function toSearch() {
      try {
        const check = pageStepRef.current === 10 && page > 1;
        const { data } = await getCharacters(
          searchString,
          String(check ? Math.ceil(page / 2) : page)
        );

        setError(false);
        setCount(data.info.count);
        updateCharacters(data.results);
      } catch (error) {
        setError(true);

        if (axios.isAxiosError(error)) {
          setMessage(
            error.response?.status === 404
              ? 'Not Found'
              : `Error with code ${error.response?.status}`
          );
        } else {
          setMessage('Unknown error');
        }
      }

      setLoading(false);
    }

    toSearch();
  }, [searchString, updateCharacters, page]);

  let items = characters;
  if (items && pageStepRef.current === 10) {
    items = (page * pageStepRef.current) % 20 !== 0 ? items.slice(0, 10) : items.slice(-10);
  }

  const CharacterListError: React.FC<{ message: string }> = ({ message }) => (
    <div className={classes.cardList}>
      <p className={classes.message}>{message}</p>
    </div>
  );

  return isLoading ? (
    <div className={commonClasses.loaderContainer}>
      <Loader />
    </div>
  ) : (
    <div className={classes.cardContainer}>
      {!error && characters.length ? (
        <>
          <div className={classes.cardList}>
            {items.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          <Pagination count={count} pageStep={pageStepRef.current} />
        </>
      ) : (
        <CharacterListError message={message} />
      )}
    </div>
  );
};

export default CharacterList;
