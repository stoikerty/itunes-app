import React, { Component, PropTypes } from 'react';

export default class ResultsList extends Component {
  static displayName = 'ResultsList'
  static defaultProps = {}
  static propTypes = {
    results: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { results } = this.props;

    return (
      <div>
        {'ResultsList'}
        {results.map(({ wrapperType, artworkUrl100, artistName, collectionName }, index) => (
          <div key={index}>
            <Choose>
              <When condition={wrapperType === 'artist'}>
                { 'Artist' }
                { artistName }
              </When>
              <When condition={wrapperType === 'album'}>
                { '' }
              </When>
              <When condition={wrapperType === 'song'}>
                <img src={artworkUrl100} alt={collectionName} />
                { artistName }
              </When>
              <Otherwise>
                <img src={artworkUrl100} alt={collectionName} />
                { artistName }
              </Otherwise>
            </Choose>
          </div>
        ))}
      </div>
    );
  }
}
