import React, { Component } from 'react';
import classes from './style.module.scss';
import SearchSVG from "../../assets/search.svg?react";

type SearchProps = {
  setSearchQuery: (words: string) => void;
  toSearch: (event: React.MouseEvent<HTMLElement>) => void;
};

type SearchState = {};

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
  }

  render() {
    return (
      <div className={classes.container}>
        <span className={classes.inputBox}>
          <SearchSVG />
          <input
            type='text'
            onChange={(event) => this.props.setSearchQuery(event.target.value)}
            placeholder="Please, input person name"
          />
        </span>

        <button
          className={classes.button}
          onClick={(event) => this.props.toSearch(event)}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
