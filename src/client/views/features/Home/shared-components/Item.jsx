import React, { Component, PropTypes } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import cx from 'classnames';

import s from './Item/_style.scss';

export default class Item extends Component {
  static displayName = 'Item'
  static defaultProps = {}
  static propTypes = {
    type: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    fullResult: PropTypes.object,
    isFavourite: PropTypes.bool,
    saveFavourite: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.saveFavourite = this.saveFavourite.bind(this);

    this.state = {};
  }

  saveFavourite() {
    const { fullResult } = this.props;
    this.props.saveFavourite(fullResult);
  }

  render() {
    const { type, imageUrl, title, subTitle, isFavourite } = this.props;
    const isArtist = type === 'artist';
    const isAlbum = type === 'collection';
    const isSong = type === 'track';

    return (
      <div className={cx(s.item, { isArtist, isAlbum, isSong })}>
        <div className={s.image}>
          <Choose>
            <When condition={isArtist}>
              <Icon name="child" size="large" />
            </When>
            <Otherwise>
              <img src={imageUrl} alt={title} />
            </Otherwise>
          </Choose>
        </div>
        <div className={s.title}>
          { title }
        </div>
        <div className={s.subTitle}>
          { subTitle }
        </div>
        <div className={s.favouriteButton}>
          <Button
            active={isFavourite}
            onClick={this.saveFavourite}
            circular
            icon="star"
            color={isFavourite ? 'yellow' : 'grey'}
          />
        </div>
        <div className={s.type}>
          <Choose>
            <When condition={isArtist}>
              <Icon name="user" size="small" />
              { 'Artist' }
            </When>
            <When condition={isAlbum}>
              <Icon name="music" size="small" />
              { 'Album' }
            </When>
            <Otherwise>
              <Icon name="file audio outline" size="small" />
              { 'Song' }
            </Otherwise>
          </Choose>
        </div>
      </div>
    );
  }
}
