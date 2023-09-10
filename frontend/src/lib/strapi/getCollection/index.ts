import strapiFetchGraphQL from '/src/lib/strapi/fetchGraphQL';
import { strapiGraphqlQueryCollection } from '/src/lib/strapi/graphql/queries';
import isMain from '/src/lib/isMain';

/**
 * strapiGetCollection Function
 * 
 * Fetches a specified collection from Strapi CMS using GraphQL. The function constructs a query
 * using the provided collection name and any optional additional query fragments. It toggles between
 * the 'PREVIEW' and 'LIVE' publication states based on the environment. If successful, it returns 
 * the collection data. Otherwise, it throws an error with a detailed message.
 * 
 * @param {Object} options - Configuration object for fetching a Strapi collection.
 * @param {string} options.collection - The name of the Strapi collection to fetch.
 * @param {string} [options.additionalQuery] - Optional additional GraphQL fragments.
 * 
 * @throws {Error} Will throw an error if the collection parameter isn't provided or if fetching fails.
 * 
 * @returns {Promise<any>} Resolves with the fetched collection data.
 */

interface StrapiGetCollectionOptions {
  additionalQuery?: string;
  collection: string;
}

const strapiGetCollection = async ({
  additionalQuery,
  collection,
}: StrapiGetCollectionOptions): Promise<any> => {
  if (collection && typeof collection === `string`) {
    const query = `
      query {
        ${collection}(publicationState: ${!isMain ? `PREVIEW` : `LIVE`}) {
          data {
            ${strapiGraphqlQueryCollection}
            ${additionalQuery || ``}
          }
        }
      }
    `;

    const data = await strapiFetchGraphQL({ query });
    const collectionList = data?.data?.[collection]?.data || null;

    if (collectionList) {
      return collectionList;
    } else {
      throw new Error(
        `Error in strapiGetCollection: error fetching collection data.\n\n` +
        `collection: ${collection}\n\n` +
        `additionalQuery: ${additionalQuery}\n\n` +
        `data: ${JSON.stringify(data, null, 2)}`
      );
    }
  } else {
    throw new Error(
      `Error in strapiGetCollection: collection string must be passed in. Found ${collection}`
    );
  }
};

export default strapiGetCollection;
