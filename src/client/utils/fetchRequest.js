import { isClient } from 'src/settings';
import { consoleWrapper } from 'src/client/utils';

export default (
  options = {
    url: '',
    options: '',
    onSuccess: null,
    onError: null,
    onException: null,

    // this is a stich because I don't want to rewrite this to handle
    // empty repsonses. Backend is legacy, and shouldn't be touched, it should
    // be re-written, This works fine
    usesLegacyEndpoint: false,
  }
) => {
  function prepareResponse(response) {
    return Promise.all([
      response,
      response.json(),
    ]);
  }

  function checkStatus([response, json]) {
    if (options.onError && (response.status === 400 || response.status === 401)) {
      consoleWrapper.warn('fetch - Error', response, json);
      options.onError({ response, json });
    } else if (options.onSuccess && (response.status >= 200 && response.status <= 300)) {
      consoleWrapper.warn('fetch - Success', response, json);
      options.onSuccess({ response, json });
    } else if (options.onException) {
      consoleWrapper.warn('fetch - Exception', response, json);
      options.onException({ response, json });
    }
  }

  function handleException(error) {
    // Modal-triggers and other types of error messages are handled on an individual basis
    if (options.onException) {
      options.onException({ error });
    }

    consoleWrapper.warn('fetch - Server Request Error', error);
    throw (new Error('fetch - Server Request Error'));
  }

  if (isClient) {
    consoleWrapper.warn('fetch request', options.url, options.options);
    fetch(options.url, options.options)
      .then(prepareResponse)
      .then(checkStatus)
      .catch(handleException);
  }
};
