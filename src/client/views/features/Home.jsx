import React, { Component } from 'react';

import { fetchFromItunes } from 'src/client/utils';
import SearchBar from './Home/SearchBar';
import FavouritesList from './Home/FavouritesList';
import ResultsList from './Home/ResultsList';

import s from './Home/_style.scss';

export default class Home extends Component {
  static displayName = 'Home'
  static defaultProps = {}
  static propTypes = {}

  constructor(props) {
    super(props);
    this.toggleList = this.toggleList.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      results: [],
      currentPage: 0,
      favourites: [],
      showFavourites: false,
      isLoading: false,
    };
  }

  toggleList() {
    this.setState({ showFavourites: !this.state.showFavourites });
  }

  search({ query }) {
    const { isLoading } = this.state;

    if (!isLoading) {
      this.setState({
        isLoading: true,
      });

      fetchFromItunes({
        media: 'all',
        entity: 'musicArtist,album,song',
        country: 'GB',
        // attribute: 'musicArtist',
        term: query || 'diplo',
        // limit: 10,
        // artist
        // album
        // song
      }, ({ results }) => {
        this.setState({
          results: results || [],
          currentPage: 0,
          isLoading: false,
        });
      });
    }
  }

  render() {
    const { isLoading, results, favourites, showFavourites } = this.state;
    return (
      <div className={s.home}>
        <SearchBar
          onSearch={this.search}
          toggleList={this.toggleList}
          isLoading={isLoading}
          showFavourites={showFavourites}
        />

        <Choose>
          <When condition={showFavourites}>
            <FavouritesList favourites={favourites} />
          </When>
          <Otherwise condition={showFavourites}>
            <ResultsList results={results} />
          </Otherwise>
        </Choose>
      </div>
    );
  }
}
