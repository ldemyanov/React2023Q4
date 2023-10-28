import React, { Component } from 'react';
import { Search, CharacterList } from './components';
import { ICharacter } from './types';
// import { getPersonByName } from './api/swapi';
import classes from './style.module.scss';
import { getCharacters } from './api/rickandmortyapi';

type SearchPageProps = {};

type SearchPageState = {
  persons: ICharacter[];
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
    const { count, results } = await getCharacters(this.state.searchQuery);
    this.setState({ persons: results });
  };

  render() {
    return (
      <>
        <header className={classes.header}>
          <Search
            setSearchQuery={this.setSearchQuery}
            toSearch={this.toSearch}
          />
        </header>

        <CharacterList persons={this.state.persons}/>
      </>
    );
  }
}

export default SearchPage;
