import React, { Component } from 'react';
import { Search, CharacterList, Loader } from './components';
import { ICharacter } from './types';
import classes from './style.module.scss';
import { getCharacters } from './api/rickandmortyapi';

type SearchPageProps = object;

type SearchPageState = {
  characters: ICharacter[];
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
      characters: [],
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
      const searchString = this.state.searchQuery.trim();
      getCharacters(searchString)
        .then((res) =>
          this.setState({
            isLoading: false,
            error: false,
            characters: res.results,
            message: this.defaultMessage,
          })
        )
        .catch((error: { message: string; status: number }) => {
          this.setState({
            isLoading: false,
            characters: [],
            error: true,
            message: error.status === 404 ? 'Not found' : error.message,
          });

          if (error.status === 404) {
            throw Error('Uncknown Error!');
          }
        });
    });
  };

  componentDidMount() {
    this.toSearch();
  }

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
            characters={this.state.characters}
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
