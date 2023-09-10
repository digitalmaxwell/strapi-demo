import strapiGetCollection from '/src/lib/strapi/getCollection';
import arrayIsValid from '/src/lib/arrayIsValid';
import getObjectKeyByString from '/src/lib/getObjectKeyByString';

/**
 * Type definition for the arguments passed to the strapiGetStaticPaths function.
 */
interface StrapiGetStaticPathsArgs {
  collection: string;
  additionalQuery?: string;
  filter?: (item: any) => boolean;  // Update 'any' with a more specific type if possible
  slugPath: string;
}

/**
 * Generates static paths for Next.js based on Strapi collections.
 *
 * @param {StrapiGetStaticPathsArgs} args - Arguments required to fetch the data and generate paths.
 * @param {string} args.collection - The name of the Strapi collection.
 * @param {string} [args.additionalQuery] - Additional query to retrieve data from Strapi.
 * @param {(item: any) => boolean} [args.filter] - Optional filter function to filter data items.
 * @param {string} args.slugPath - The path to the slug in the data item.
 *
 * @returns {Promise<{ params: { id: string[] } }[]>} An array of paths for Next.js static site generation.
 *
 * @throws Will throw an error if the collection is not valid or paths cannot be generated.
 */

const strapiGetStaticPaths = async ({
  collection,
  additionalQuery,
  filter,
  slugPath,
}: StrapiGetStaticPathsArgs): Promise<{ params: { id: string[] } }[]> => {
  if (collection && typeof collection === `string`) {
    const data = await strapiGetCollection({collection, additionalQuery});

    if (arrayIsValid(data)) {
      const paths = data
        .filter((item) => (filter ? filter(item) : true))
        .map((item) => {
          const slug = getObjectKeyByString(item, slugPath);

          if (slug) {
            const path = (
              slug === `/`
                ? []
                : slug.startsWith(`/`)
                ? slug.replace(`/`, ``).split(`/`)
                : slug.split(`/`)
            )?.filter((item: string) => !!item);

            if (path) {
              return {
                params: {
                  id: path,
                },
                // TODO: also return specific locale
              };
            } else {
              throw new Error(
                `Error in strapiGetStaticPaths: invalid path.\n\npath: ${path}`
              );
            }
          } else {
            throw new Error(
              `Error in strapiGetStaticPaths: item must contain a valid slug.\n\n${slugPath}: ${slug}\n\ncollection: ${collection}\n\nitem: ${JSON.stringify(
                item,
                null,
                2
              )}`
            );
          }
        });

      if (arrayIsValid(paths)) {
        return paths;
      } else {
        throw new Error(
          `Error in strapiGetStaticPaths: paths is not a valid array or no paths were returned from data. Found ${paths}`
        );
      }
    }
  } else {
    throw new Error(
      `Error in strapiGetStaticPaths: collection must be a valid string. Found ${collection}`
    );
  }
  return Promise.reject(new Error("Unexpected error in strapiGetStaticPaths"));
};

export default strapiGetStaticPaths;