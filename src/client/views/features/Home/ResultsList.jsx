import React, { Component, PropTypes } from 'react';
import { Header } from 'semantic-ui-react';

import Item from './shared-components/Item';

export default class ResultsList extends Component {
  static displayName = 'ResultsList'
  static defaultProps = {}
  static propTypes = {
    searchStarted: PropTypes.bool,
    formattedResults: PropTypes.array,
    results: PropTypes.array,
    showFavourites: PropTypes.bool,
    saveFavourite: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { searchStarted, formattedResults, results, showFavourites, saveFavourite } = this.props;

    return (
      <div>
        <If condition={searchStarted && formattedResults.length}>
          <Header size="medium">
            {showFavourites ? 'Your Favourites' : 'Search Results'}
          </Header>
        </If>

        <If condition={showFavourites && !formattedResults.length}>
          {'You currently have no favourites.'}
        </If>
        <If condition={!showFavourites && searchStarted && !formattedResults.length}>
          {'No Results have been found.'}
        </If>

        {formattedResults.map((
          {
            wrapperType,
            artworkUrl100,
            artistName,
            collectionName,
            artistLinkUrl,
            trackName,
            isFavourite,
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
                  fullResult={results[index]}
                  isFavourite={isFavourite}
                  saveFavourite={saveFavourite}
                />
              </When>
              <When condition={wrapperType === 'collection'}>
                <Item
                  type={wrapperType}
                  imageUrl={artworkUrl100}
                  title={collectionName}
                  subTitle={artistName}
                  fullResult={results[index]}
                  isFavourite={isFavourite}
                  saveFavourite={saveFavourite}
                />
              </When>
              <When condition={wrapperType === 'track'}>
                <Item
                  type={wrapperType}
                  imageUrl={artworkUrl100}
                  title={trackName}
                  subTitle={artistName}
                  fullResult={results[index]}
                  isFavourite={isFavourite}
                  saveFavourite={saveFavourite}
                />
              </When>
            </Choose>
          </div>
        ))}
      </div>
    );
  }
}
