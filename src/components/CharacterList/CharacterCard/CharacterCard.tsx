import React from 'react';
import classes from './style.module.scss';
import { ICharacter } from '../../../types';

type ChararcterCardProps = {
  character: ICharacter;
};

function ChararcterCard(props: ChararcterCardProps) {
  const { name, gender, image, status, species } = props.character;

  return (
    <div className={classes.card}>
      <p>
        <span className={classes.name}>{name}</span>
      </p>
      <p className={classes.line}>
        <span className={classes.label}>Gender: </span>
        <span className={classes.property}>{gender}</span>
      </p>
      <p className={classes.line}>
        <span className={classes.label}>Status: </span>
        <span className={classes.property}>{status}</span>
      </p>
      <p className={classes.line}>
        <span className={classes.label}>Species: </span>
        <span className={classes.property}>{species}</span>
      </p>
      <img className={classes.image} src={image} alt={name} />
    </div>
  );
}

export default ChararcterCard;
