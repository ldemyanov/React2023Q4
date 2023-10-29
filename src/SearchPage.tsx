import React, { Component } from 'react';
import { Search, CharacterList } from './components';
import { ICharacter } from './types';
// import { getPersonByName } from './api/swapi';
import classes from './style.module.scss';
import { getCharacters } from './api/rickandmortyapi';

type SearchPageProps = object;

type SearchPageState = {
  persons: ICharacter[];
  searchQuery: string;
  message: string;
  error: boolean;
};

class SearchPage extends Component<SearchPageProps, SearchPageState> {
  defaultMessage: string =
    'Find your favorite character in the cartoon Rick and Morty';

  constructor(props: SearchPageProps) {
    super(props);
    this.state = {
      persons: [],
      searchQuery: localStorage.getItem('searchQuery') ?? '',
      message: this.defaultMessage,
      error: false,
    };
  }

  setSearchQuery = (searchQuery: string) => {
    this.setState({ searchQuery });
    localStorage.setItem('searchQuery', searchQuery);
  };

  toSearch = async () => {
    try {
      const res = await getCharacters(this.state.searchQuery);
      this.setState({
        persons: res.results,
        error: false,
        message: this.defaultMessage,
      });
    } catch (error: unknown) {
      const mes: string = 'Uppss, error';

      // if (error.status >= 500) {
      //   mes = 'Internal api server error :(';
      // }
      // if (error.status >= 400 && error.status < 500) {
      //   mes = 'Not Found';
      // }

      this.setState({
        persons: [],
        message: mes,
        error: true,
      });
    }
  };

  render() {
    return (
      <>
        <header className={classes.header}>
          <Search
            setSearchQuery={this.setSearchQuery}
            searchQuery={this.state.searchQuery}
            toSearch={this.toSearch}
          />
        </header>

        <CharacterList
          persons={this.state.persons}
          error={this.state.error}
          message={this.state.message}
        />
      </>
    );
  }
}

export default SearchPage;
