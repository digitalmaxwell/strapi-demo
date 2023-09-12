/**
 * Determines if the provided array has any items.
 *
 * This is a utility function designed to not just check if something is an array,
 * but also to ensure that this array has one or more items. It's useful when you want
 * to be certain that a given array isn't just initialized but also populated.
 *
 * @param {any[]} array - The array to check.
 * @returns {boolean} Returns `true` if the array has length, otherwise `false`.
 */

const arrayHasLength = (array: any[]): array is any[] => {
  return !!(array && Array.isArray(array) && array.length);
};

export default arrayHasLength;
