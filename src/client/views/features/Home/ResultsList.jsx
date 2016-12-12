import React, { Component, PropTypes } from 'react';

import Item from './shared-components/Item';

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
        {results.map((
          {
            wrapperType,
            artworkUrl100,
            artistName,
            collectionName,
            artistLinkUrl,
            trackName,
          },
          index
        ) => (
          <div key={index}>
            <Choose>
              <When condition={wrapperType === 'artist'}>
                <Item
                  type={wrapperType}
                  title={artistName}
                  subTitle={artistLinkUrl}
                />
              </When>
              <When condition={wrapperType === 'collection'}>
                <Item
                  type={wrapperType}
                  imageUrl={artworkUrl100}
                  title={collectionName}
                  subTitle={artistName}
                />
              </When>
              <When condition={wrapperType === 'track'}>
                <Item
                  type={wrapperType}
                  imageUrl={artworkUrl100}
                  title={trackName}
                  subTitle={artistName}
                />
              </When>
            </Choose>
          </div>
        ))}
      </div>
    );
  }
}
