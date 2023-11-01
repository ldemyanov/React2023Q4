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
      <div className="flex flex-col" style={{ width: '960px' }}>
        <div className={classes.cardList}>
          {characters.map((character, index) => (
            <CharacterCard key={index} character={character} />
          ))}
        </div>
        <div className="flex justify-center text-slate-100">
          <button className="mx-2">left</button>
          <span className="mx-2">1</span>
          <button className="mx-2">right</button>
        </div>
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
