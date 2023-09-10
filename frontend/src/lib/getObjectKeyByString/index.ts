import arrayIsValid from '/src/lib/arrayIsValid';

/**
 * Fetches the value from an object based on a dot-separated string path.
 * 
 * In Strapi implementations, data is often nested within complex objects. This helper function 
 * allows for efficient and dynamic data retrieval from nested structures using a simple string path.
 * This can be particularly useful when working with Strapi's content types and components, 
 * which might have varying levels of nesting and complexity.
 * 
 * @param {Object} object - The object from which to retrieve the value.
 * @param {string} path - The dot-separated path to the desired value in the object.
 * 
 * @throws {Error} If the object or path is invalid.
 * 
 * @returns {any} - Returns the value from the object based on the provided path.
 */

const getObjectKeyByString = (object: Record<string, any>, path: string): any => {
  if (
    typeof object === 'object' && 
    arrayIsValid(Object.keys(object)) && 
    typeof path === 'string' && 
    path.trim().length > 0 &&
    arrayIsValid(path.split('.'))
  ) {
    return path.split('.').reduce((o, p) => o?.[p], object);
  } else {
    throw new Error(
      `Error in getObjectKeyByString: invalid object or path.\n\nobject: ${JSON.stringify(object)}\n\npath: ${path}`
    );
  }
};

export default getObjectKeyByString;
