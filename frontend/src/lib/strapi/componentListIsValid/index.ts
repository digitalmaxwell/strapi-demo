import arrayIsValid from '/src/lib/arrayIsValid';

/**
 * componentListIsValid Function
 * 
 * Verifies if a given component list from Strapi CMS is valid. This function checks if the 
 * component list is not null or undefined and ensures every entry in the list contains valid data.
 * 
 * The Strapi CMS organizes its component lists as objects where each key corresponds to a component
 * name and the associated value is an array of instances of that component. This function ensures that 
 * every component in the list has at least one valid instance.
 * 
 * @param {Record<string, any[]>} componentList - Object representing the component list from Strapi.
 * Each key represents a component name and the associated value is an array of instances.
 * 
 * @returns {boolean} Returns true if the component list is valid; false otherwise.
 */

const componentListIsValid = (componentList: Record<string, any[]>): boolean => {
  // Ensure the component list exists and is not empty
  if (!componentList || !arrayIsValid(Object.values(componentList))) {
    return false;
  }

  // Ensure every component has at least one instance
  return Object.values(componentList).every((item) => !!item?.length);
};

export default componentListIsValid;
