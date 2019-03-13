import { ignoreElements, tap } from 'rxjs/operators';

/**
 * log all actions for debugging during development.
 * @function
 * @param {Observable} action$
 * @returns {Observable}
 */
export default (action$) =>
  action$.pipe(
    tap(console.debug), // eslint-disable-line no-console
    ignoreElements()
  );
