import React, { Component } from 'react';
import { ICharacter } from '../../types';
import classes from './stye.module.scss';
import { CharacterCard } from './CharacterCard';

type PersonListProps = {
  persons: ICharacter[];
};

class PersonList extends Component<PersonListProps> {
  constructor(props: PersonListProps) {
    super(props);
  }

  render() {
    return (
      <>
      <div className={classes.cardList}>
        {this.props.persons.map((person, index) => (
          <CharacterCard key={index} person={person} />
        ))}
      </div>
      </>
    );
  }
}

export default PersonList;
