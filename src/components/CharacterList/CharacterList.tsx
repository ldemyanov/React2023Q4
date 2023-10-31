import React from 'react';
import { ICharacter } from '../../types';
import classes from './stye.module.scss';
import { CharacterCard } from './CharacterCard';

type CharacterListProps = {
  characters: ICharacter[];
  error: boolean;
  message: string;
};

function CharacterList({ characters, error, message }: CharacterListProps) {
  if (!error && characters.length) {
    return (
      <div className={classes.cardList}>
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    );
  }

  return (
    <div className={classes.cardList}>
      <p className={classes.message}>{message}</p>
    </div>
  );
}

export default CharacterList;
