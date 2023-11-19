import React from 'react';
import commonClasses from '../../styles/common.module.scss';
import classes from './stye.module.scss';
import { CharacterCard } from './CharacterCard';
import { Loader } from '..';
import { Pagination } from './Pagination';
import { useAppSelector } from '../../hooks/redux';
import { useFetchCharactersQuery } from '../../services/RickAndMortyService';

const CharacterList: React.FC = () => {
  const { searchString: name, page, perPageElements } = useAppSelector((state) => state.search);
  const { isLoading, isError, data } = useFetchCharactersQuery({ name, page, perPageElements });

  const characters = data?.results || [];
  const count = data?.info.count || 0;

  const CharacterListError: React.FC<{ message: string }> = ({ message }) => (
    <div className={classes.cardList}>
      <p className={classes.message}>{message}</p>
    </div>
  );

  return isLoading ? (
    <div className={commonClasses.loaderContainer} data-testid="testLoader">
      <Loader />
    </div>
  ) : (
    <div className={classes.cardContainer}>
      {!isError && characters.length ? (
        <>
          <div className={classes.cardList}>
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          <Pagination count={count} />
        </>
      ) : (
        <CharacterListError message="Not Found" />
      )}
    </div>
  );
};

export default CharacterList;
