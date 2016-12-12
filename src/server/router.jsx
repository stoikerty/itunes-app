import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import searchitunes from 'searchitunes';

import { useServerRendering } from 'src/settings';
import routes from '../client/routes';

// React Router Boilerplate
// Note:
//   Adapted from server-rendering example: https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/ServerRendering.md
export default (req, res) => {
  if (req.url.startsWith('/itunes-api')) {
    console.log(req);
    const searchParams = req.query;
    searchitunes(searchParams, (error, data) => {
      if (error) {
        res.status(400).json({ message: 'Something broke', error });
        return;
      }
      // All good
      res.status(200).json({ message: 'All good', data });
    });
  } else {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const reactHtml = useServerRendering ?
          ReactDOM.renderToString(<RouterContext {...renderProps} />) : '';

        // Render `layout`-template using Handlebars
        res.status(200).render('layout', {
          reactHtml,
          isDev: global.isDev,
        });
      } else {
        res.status(404).send('Not found');
      }
    });
  }
};
