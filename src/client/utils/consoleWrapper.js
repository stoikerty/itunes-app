import { isDev, isClient } from 'src/settings';

// Create application logging functionality.
// A neat console wrapper that keeps the correct line number.
// http://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number

/* eslint-disable no-console, no-else-return */
const consoleFactory = (fn, isUsable = false) => {
  if (isClient && isUsable
      && (typeof window !== 'undefined' && window.console && window.console[fn])) {
    return window.console[fn].bind(window.console);
  } else {
    return () => {};
  }
};
/* eslint-enable no-console, no-else-return */

export const log = consoleFactory('log', isDev);
export const warn = consoleFactory('warn', isDev);
export const info = consoleFactory('info', isDev);
export const table = consoleFactory('table', isDev);
