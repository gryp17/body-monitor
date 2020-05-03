import moment from 'moment/min/moment-with-locales';

moment.locale('bg');

/**
 * Formats the provided date
 * @param {Date} date
 * @param {String} format
 * @returns {String}
 */
export default (date, format = 'YYYY-MM-DD') => {
	return moment(date).format(format);
};
