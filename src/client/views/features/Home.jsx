import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

import { fetchFromItunes } from 'src/client/utils';
import SearchBar from './Home/SearchBar';
// import FavouritesList from './Home/FavouritesList';
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
    this.saveFavourite = this.saveFavourite.bind(this);

    this.state = {
      results: [],
      currentPage: 0,
      favourites: [],
      showFavourites: false,
      isLoading: false,
    };
  }

  componentWillMount() {
    this.setState(JSON.parse(localStorage.getItem('itunes-app')));
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('itunes-app', JSON.stringify(nextState));
  }

  toggleList() {
    this.setState({ showFavourites: !this.state.showFavourites });
  }

  saveFavourite(result) {
    this.setState({ favourites: this.state.favourites.concat(result) });
  }

  search({ query }) {
    const { isLoading } = this.state;

    if (!isLoading) {
      this.setState({
        isLoading: true,
      });

      fetchFromItunes({
        media: 'all',
        entity: 'musicArtist',
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
    const formattedResults = results;
    return (
      <div className={s.home}>
        <SearchBar
          onSearch={this.search}
          toggleList={this.toggleList}
          isLoading={isLoading}
          showFavourites={showFavourites}
        />
        <Divider />
        <Choose>
          <When condition={showFavourites}>
            <ResultsList
              results={results}
              formattedResults={favourites}
              saveFavourite={this.saveFavourite}
              showFavourites={showFavourites}
            />
          </When>
          <Otherwise condition={showFavourites}>
            <ResultsList
              results={results}
              formattedResults={formattedResults}
              saveFavourite={this.saveFavourite}
            />
          </Otherwise>
        </Choose>
      </div>
    );
  }
}
