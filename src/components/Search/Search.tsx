import React, { Component } from 'react';
import classes from './style.module.scss';
import SearchSVG from '../../assets/search.svg?react';

type SearchProps = {
  searchQuery: string;
  setSearchQuery: (words: string) => void;
  toSearch: () => void;
};

type SearchState = object;

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
  }

  keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      this.props.toSearch();
    }
  };

  getError = () => {
    this.props.setSearchQuery('Bomb');
  };

  render() {
    if (this.props.searchQuery === 'Bomb') {
      throw Error('Bomb');
    }

    return (
      <div className={classes.container}>
        <span className={classes.inputBox}>
          <SearchSVG />
          <input
            type="text"
            onChange={(event) => this.props.setSearchQuery(event.target.value)}
            onKeyDown={this.keyDownHandler}
            placeholder="Please, input characters name"
            value={this.props.searchQuery}
          />
        </span>

        <button
          className={classes.button}
          onClick={() => this.props.toSearch()}
        >
          Search
        </button>

        <button className={classes.button} onClick={this.getError}>
          Get Error
        </button>
      </div>
    );
  }
}

export default Search;
