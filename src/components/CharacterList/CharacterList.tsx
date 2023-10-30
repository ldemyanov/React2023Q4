import React, { Component } from 'react';
import { ICharacter } from '../../types';
import classes from './stye.module.scss';
import { CharacterCard } from './CharacterCard';

type PersonListProps = {
  persons: ICharacter[];
  error: boolean;
  message: string;
};

class PersonList extends Component<PersonListProps> {
  constructor(props: PersonListProps) {
    super(props);
  }

  render() {
    const { error, message, persons } = this.props;

    if (!error && persons.length) {
      return (
        <div className={classes.cardList}>
          {persons.map((person, index) => (
            <CharacterCard key={index} person={person} />
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
}

export default PersonList;
