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

    console.log('Render Person List');

    return (
      <>
        {!error && PersonList.length ? (
          <div className={classes.cardList}>
            {persons.map((person, index) => (
              <CharacterCard key={index} person={person} />
            ))}
          </div>
        ) : (
          <p className={classes.message}>{message}</p>
        )}
      </>
    );
  }
}

export default PersonList;
