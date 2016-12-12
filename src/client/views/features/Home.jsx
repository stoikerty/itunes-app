import React, { Component } from 'react';

import { fetchFromItunes } from 'src/client/utils';

import s from './Home/_style.scss';

export default class Home extends Component {
  static displayName = 'Home'
  static defaultProps = {}
  static propTypes = {}

  constructor(props) {
    super(props);

    this.state = {};

    fetchFromItunes({
      entity: 'software',
      country: 'NL',
      term: 'github',
      limit: 1,
      price: 0,
    }, (result) => console.log('woop woop', result));
  }

  render() {
    return (
      <div className={s.home}>
        {'Home'}
      </div>
    );
  }
}
