import arrayIsValid from '/src/lib/arrayIsValid';
import getObjectKeyByString from '/src/lib/getObjectKeyByString';

/**
 * Fetches the ID of an item from a collection based on a given slug.
 * 
 * @param {Object} params 
 * @param {Array} params.collection - The collection from which to retrieve the item ID.
 * @param {string | Array} params.slug - The slug or slugs to match against.
 * @param {string} params.slugPath - The path inside the collection item to match against the slug.
 * @param {boolean} [params.fullPath=true] - If true, uses the full slug as path, else only the last segment.
 * 
 * @throws {Error} If the collection is not a valid array.
 * @throws {Error} If the specified slug item isn't found in the collection.
 * 
 * @returns {string | undefined} - Returns the ID of the matched item or throws an error.
 */

interface StrapiGetIdBySlugParams {
  collection: any[];
  slug: string | string[];
  slugPath: string;
  fullPath?: boolean;
}

const strapiGetIdBySlug = ({ collection, slug, slugPath, fullPath = true }: StrapiGetIdBySlugParams): string | undefined => {
  if (!arrayIsValid(collection)) {
    throw new Error(`Error in strapiGetIdBySlug: collection must be a valid array. Found ${collection}`);
  }
	if (!slug) {
		throw new Error(`Error in strapiGetIdBySlug: slug must be provided. Found ${slug}`);
	}

  let uri: string;

  if (arrayIsValid(slug as string[])) {
    const slugArray = slug as string[];
    uri = fullPath ? `/${slugArray.join('/')}` : slugArray[slugArray.length - 1];
  } else {
    uri = slug as string;
  }

  const matchedItem = collection.find(item => getObjectKeyByString(item, slugPath) === uri);

  if (matchedItem?.id) {
    return matchedItem.id;
  }

  throw new Error(`Error in strapiGetIdBySlug: could not locate item '${uri}' in collection`);
};

export default strapiGetIdBySlug;
