import React, { Component } from 'react';

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
      <>
        <input onChange={(event) => this.props.setSearchQuery(event.target.value)}/>
        <button onClick={(event) => this.props.toSearch(event)}>Search</button>
      </>
    );
  }
}

export default Search;
