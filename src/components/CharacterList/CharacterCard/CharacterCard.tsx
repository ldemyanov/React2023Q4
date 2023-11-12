import React from 'react';
import classes from './style.module.scss';
import { ICharacter } from '../../../types';
import { Link, useSearchParams } from 'react-router-dom';

type ChararcterCardProps = {
  character: ICharacter;
};

function ChararcterCard(props: ChararcterCardProps) {
  const [params] = useSearchParams();
  const { name, image, id } = props.character;

  return (
    <Link to={`/${id}?${params.toString()}`}>
      <div data-testid="characterCard" className={classes.card}>
        <p>
          <span className={classes.name}>{name}</span>
        </p>
        <img className={classes.image} src={image} alt={name} />
      </div>
    </Link>
  );
}

export default ChararcterCard;
