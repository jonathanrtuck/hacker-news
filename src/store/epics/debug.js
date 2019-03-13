import { ignoreElements, tap } from 'rxjs/operators';

/**
 * @constant
 * @function
 * @param {Observable}
 * @returns {Observable}
 */
export default (action$) =>
  action$.pipe(
    tap(console.debug), // eslint-disable-line no-console
    ignoreElements()
  );
