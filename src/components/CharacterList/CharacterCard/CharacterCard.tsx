import React from 'react';
import classes from './style.module.scss';
import { ICharacter } from '../../../types';

type ChararcterCardProps = {
  character: ICharacter;
};

function ChararcterCard(props: ChararcterCardProps) {
  const { name, image } = props.character;

  return (
    <div className={classes.card}>
      <p>
        <span className={classes.name}>{name}</span>
      </p>
      <img className={classes.image} src={image} alt={name} />
    </div>
  );
}

export default ChararcterCard;
