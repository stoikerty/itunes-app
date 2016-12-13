import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import isEqual from 'lodash.isequal';

import { fetchFromItunes } from 'src/client/utils';
import SearchBar from './Home/SearchBar';
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
      searchStarted: false,
    };

    // set the initial state when app starts
    localStorage.setItem('itunes-app', JSON.stringify(this.state));
  }

  componentWillMount() {
    // load state after hot-reloading
    const previousState = JSON.parse(localStorage.getItem('itunes-app'));
    this.setState({ ...previousState });
  }

  componentWillUpdate(nextProps, nextState) {
    // keep state when hot-reloading
    localStorage.setItem('itunes-app', JSON.stringify(nextState));
  }

  toggleList() {
    this.setState({ showFavourites: !this.state.showFavourites });
  }

  saveFavourite(result) {
    const { favourites } = this.state;
    const resultExists = favourites.filter((favourite) => isEqual(result, favourite)).length > 0;
    this.setState({
      favourites: resultExists
        ? favourites.filter((favourite) => !isEqual(result, favourite))
        : favourites.concat(result),
    });
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
        term: query,
      }, ({ results }) => {
        this.setState({
          results: results || [],
          currentPage: 0,
          isLoading: false,
          searchStarted: true,
        });
      });
    }
  }

  render() {
    const { searchStarted, isLoading, results, favourites, showFavourites } = this.state;
    const formattedResults = results.map((item) => {
      const newItem = { ...item };
      newItem.isFavourite = favourites.filter((favourite) => isEqual(item, favourite)).length > 0;
      return newItem;
    });

    return (
      <div className={s.home}>
        <SearchBar
          onSearch={this.search}
          toggleList={this.toggleList}
          isLoading={isLoading}
          showFavourites={showFavourites}
        />
        <Divider />
        <ResultsList
          searchStarted={searchStarted}
          results={showFavourites ? favourites : results}
          formattedResults={showFavourites ? favourites : formattedResults}
          saveFavourite={this.saveFavourite}
          showFavourites={showFavourites}
        />
      </div>
    );
  }
}
