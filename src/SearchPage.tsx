import React, { Component } from 'react';
import { Search, CharacterList, Loader } from './components';
import { ICharacter } from './types';
import classes from './style.module.scss';
import { getCharacters } from './api/rickandmortyapi';

type SearchPageProps = object;

type SearchPageState = {
  persons: ICharacter[];
  searchQuery: string;
  message: string;
  error: boolean;
  isLoading: boolean;
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
      isLoading: false,
    };
  }

  setSearchQuery = (searchQuery: string) => {
    this.setState({ searchQuery });
    localStorage.setItem('searchQuery', searchQuery);
  };

  toSearch = () => {
    this.setState({ isLoading: true }, () => {
      getCharacters(this.state.searchQuery)
        .then((res) =>
          this.setState({
            isLoading: false,
            persons: res.results,
          })
        )
        .catch((error: { message: string; status: number }) => {
          this.setState({
            isLoading: false,
            persons: [],
            error: true,
            message: error.status === 404 ? 'Not found' : error.message,
          });

          if (error.status === 404) {
            throw Error('Uncknown Error!');
          }
        });
    });
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

        {!this.state.isLoading ? (
          <CharacterList
            persons={this.state.persons}
            error={this.state.error}
            message={this.state.message}
          />
        ) : (
          <div className={classes.loaderContainer}>
            <Loader />
          </div>
        )}
      </>
    );
  }
}

export default SearchPage;
