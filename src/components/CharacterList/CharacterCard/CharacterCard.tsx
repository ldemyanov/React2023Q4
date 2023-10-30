import React, { Component } from 'react';
import classes from './style.module.scss';
import { ICharacter } from '../../../types';

type ChararcterCardProps = {
  person: ICharacter;
};

class ChararcterCard extends Component<ChararcterCardProps> {
  constructor(props: ChararcterCardProps) {
    super(props);
  }

  render() {
    const { name, gender, image, status, species } = this.props.person;

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
}

export default ChararcterCard;
