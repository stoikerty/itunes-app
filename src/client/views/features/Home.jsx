import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import { fetchFromItunes } from 'src/client/utils';

import s from './Home/_style.scss';

export default class Home extends Component {
  static displayName = 'Home'
  static defaultProps = {}
  static propTypes = {}

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);

    this.state = {
      results: [],
      currentPage: 0,
      favourites: [],
      isLoading: false,
    };
  }

  search({ query }) {
    const { isLoading } = this.state;

    if (!isLoading) {
      this.setState({
        isLoading: true,
      });

      fetchFromItunes({
        media: 'music',
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
    const { isLoading } = this.state;
    return (
      <div className={s.home}>
        {'Home'}
        <Button loading={isLoading} onClick={this.search} color="green">
          {'Click?'}
        </Button>
      </div>
    );
  }
}
