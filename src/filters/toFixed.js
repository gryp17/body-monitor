
/**
 * Custom implementation of the toFixed function that doesn't round the numbers
 * @param {Number} num
 * @param {Number} fixed
 * @returns {Number}
 */
export default (num, fixed = -1) => {
	const re = new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`);
	return num.toString().match(re)[0];
};
