/**
 * Helper to check if an object's property does not exist or is empty.
 *
 * @see https://stackoverflow.com/a/28552610/1120652
 *
 * @param {Object} object
 *   The object whose property will be checked.
 * @param {string} property
 *   The property within the object to check.
 * @returns {boolean}
 *   TRUE if the property does not exist or is empty.
 */
const isEmpty = function isEmpty(object, property) {
  return (
    object[property] === undefined ||
    object[property].length === 0 ||
    object[property] === "undefined"
  );
};

module.exports = isEmpty;
