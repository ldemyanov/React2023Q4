import React from 'react';
import commonClasses from '../../styles/common.module.scss';
import classes from './stye.module.scss';
import { CharacterCard } from './CharacterCard';
import { Loader } from '..';
import { Pagination } from './Pagination';
import { useQueryCharacters } from '../../hooks';
import { useSearchCtx } from '../../context';

const CharacterList: React.FC = () => {
  const { searchString, page, perPageElements } = useSearchCtx();
  const { isLoading, error, characters, count } = useQueryCharacters(
    searchString,
    perPageElements,
    page
  );

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
      {!error.isError && characters.length ? (
        <>
          <div className={classes.cardList}>
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          <Pagination count={count} />
        </>
      ) : (
        <CharacterListError message={error.message} />
      )}
    </div>
  );
};

export default CharacterList;
