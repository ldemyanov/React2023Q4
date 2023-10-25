import React, { Component } from 'react';
import { Search, PersonList } from './components';
import { IPerson } from './types';
import { getPersonByName } from './api/swapi';

type SearchPageProps = {};

type SearchPageState = {
  persons: IPerson[];
  searchQuery: string;
};

class SearchPage extends Component<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);
    this.state = {
      persons: [],
      searchQuery: '',
    };
  }

  setSearchQuery = (words: string) => {
    this.setState({ searchQuery: words });
    console.log(this.state);
  };

  toSearch = async () => {
    const { count, results } = await getPersonByName(this.state.searchQuery);
    this.setState({ persons: results });
  };

  render() {
    return (
      <>
        <Search setSearchQuery={this.setSearchQuery} toSearch={this.toSearch} />
        <PersonList persons={this.state.persons} />
      </>
    );
  }
}

export default SearchPage;
