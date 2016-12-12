import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Grid } from 'semantic-ui-react';

export default class SearchBar extends Component {
  static displayName = 'SearchBar'
  static defaultProps = {}
  static propTypes = {
    onSearch: PropTypes.func,
    toggleList: PropTypes.func,
    isLoading: PropTypes.bool,
    showFavourites: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      query: '',
    };
  }

  onSearch(e) {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSearch({ query });
  }

  onChange(proxy, { value }) {
    this.setState({ query: value });
  }

  render() {
    const { toggleList, isLoading, showFavourites } = this.props;

    return (
      <Grid>
        <Grid.Column width={13}>
          <Form onSubmit={this.onSearch}>
            <Input
              action={{
                color: 'green',
                labelPosition: 'right',
                icon: 'search',
                content: 'Search',
                onClick: this.onSearch,
                type: 'submit',
              }}
              fluid
              loading={isLoading}
              placeholder="Search..."
              onChange={this.onChange}
            />
          </Form>
        </Grid.Column>
        <Grid.Column width={3}>
          <Button
            active={showFavourites}
            onClick={toggleList}
            circular
            icon="star"
            color={showFavourites ? 'blue' : 'grey'}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
