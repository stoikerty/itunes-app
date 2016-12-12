import React, { Component } from 'react';
import { stringify } from 'query-string';

import { fetchRequest } from 'src/client/utils';

import s from './Home/_style.scss';

export default class Home extends Component {
  static displayName = 'Home'
  static defaultProps = {}
  static propTypes = {}

  constructor(props) {
    super(props);

    this.state = {};

    const headers = {
      X_REQUESTED_WITH: 'XMLHttpRequest',
      'Content-Type': 'application/json',
    };

    const itunesOptions = {
      entity: 'software',
      country: 'NL',
      term: 'github',
      limit: 1,
      price: 0,
    };

    fetchRequest({
      // url: `https://itunes.apple.com/search${'?term=jack+johnson'}`,
      url: `/itunes-api/?${stringify(itunesOptions)}`,
      options: {
        method: 'GET',
        headers,
      },

      onSuccess: ({ json }) => {
        console.log(json);
      },

      onError: (err) => {
        console.log(err);
      },

      onException: (exc) => {
        console.log(exc);
      },
    });
  }

  render() {
    return (
      <div className={s.home}>
        {'Home'}
      </div>
    );
  }
}
