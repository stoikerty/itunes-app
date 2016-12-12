import { stringify } from 'query-string';

import { fetchRequest } from 'src/client/utils';

export default (itunesOptions, callback) => {
  const headers = {
    X_REQUESTED_WITH: 'XMLHttpRequest',
    'Content-Type': 'application/json',
  };

  fetchRequest({
    // url: `https://itunes.apple.com/search${'?term=jack+johnson'}`,
    url: `/itunes-api/?${stringify(itunesOptions)}`,
    options: {
      method: 'GET',
      headers,
    },

    onSuccess: ({ json }) => {
      callback({ results: json.results });
    },

    onError: () => {
      callback({ results: null });
    },

    onException: () => {
      callback({ results: null });
    },
  });
};
