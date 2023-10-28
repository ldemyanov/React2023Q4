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
    console.log(this.props.person);
    const { name, gender, image, status, species } = this.props.person;

    return (
      <div className={classes.card}>
        <p>
          <span className={classes.label}>Name: </span>
          <span className={classes.property}>{name}</span>
        </p>
        <p>
          <span className={classes.label}>Gender: </span>
          <span className={classes.property}>{gender}</span>
        </p>
        <p>
          <span className={classes.label}>Status: </span>
          <span className={classes.property}>{status}</span>
        </p>
        <p>
          <span className={classes.label}>Species: </span>
          <span className={classes.property}>{species}</span>
        </p>
        <img src={image} alt={name} />
      </div>
    );
  }
}

export default ChararcterCard;
