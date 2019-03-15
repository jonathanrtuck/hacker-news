import { distanceInWordsToNow } from 'date-fns';
import { fromUnixTime } from 'utils/time';
import { isInteger } from 'lodash-es';
import PropTypes from 'prop-types';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const Subtitle = ({ by, score, time }) =>
  `${
    isInteger(score) ? `${score} ${score === 1 ? 'point' : 'points'} ` : ''
  }by ${by} ${distanceInWordsToNow(fromUnixTime(time), {
    addSuffix: true,
  })}`;

Subtitle.propTypes = {
  by: PropTypes.string.isRequired,
  score: PropTypes.number,
  time: PropTypes.number.isRequired,
};

/**
 * @type {ReactElement}
 */
export default Subtitle;
