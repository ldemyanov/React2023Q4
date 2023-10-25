import React, { Component } from 'react';
import { IPerson } from '../../../types';

type PersonCardProps = {
  person: IPerson;
};

class PersonCard extends Component<PersonCardProps> {
  constructor(props: PersonCardProps) {
    super(props);
  }

  render() {
    return (
      <li>
        <p>{this.props.person.name}</p>
        <p>{this.props.person.eye_color}</p>
        <p>{this.props.person.gender}</p>
        <p>{this.props.person.homeworld}</p>
      </li>
    );
  }
}

export default PersonCard;
