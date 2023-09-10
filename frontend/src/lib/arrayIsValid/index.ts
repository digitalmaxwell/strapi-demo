import arrayHasLength from '/src/lib/arrayHasLength';

/**
 * Checks if the given array is valid, ensuring it has length and all its items are truthy.
 * 
 * This function is useful when you not only want to check if an array exists and has items, 
 * but also want to ensure that none of those items are falsy (like `null`, `undefined`, `0`, `""`, etc.).
 *
 * @param {any[]} array - The array to check.
 * @returns {boolean} Returns `true` if the array is valid, otherwise `false`.
 */

const arrayIsValid = (array: any[]): array is any[] => {
  return !!(arrayHasLength(array) && arrayHasLength(array.filter((item) => !!item)));
};

export default arrayIsValid;