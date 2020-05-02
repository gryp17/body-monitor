import moment from 'moment';

/**
 * Formats the provided date
 * @param {Date} date
 * @param {String} format
 * @returns {String}
 */
export default (date, format = 'YYYY-MM-DD') => {
	return moment(date).format(format);
};
