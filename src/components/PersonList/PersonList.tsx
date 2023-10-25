import React, { Component } from 'react';
import { IPerson } from '../../types';
import { PersonCard } from './PersonCard';

type PersonListProps = {
  persons: IPerson[];
};

class PersonList extends Component<PersonListProps> {
  constructor(props: PersonListProps) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.persons.map((person, index) => (
          <PersonCard key={index} person={person} />
        ))}
      </ul>
    );
  }
}

export default PersonList;
