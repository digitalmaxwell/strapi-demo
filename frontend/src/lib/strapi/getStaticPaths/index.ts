import strapiGetCollection from "/src/lib/strapi/getCollection";
import arrayIsValid from "/src/lib/arrayIsValid";
import getObjectKeyByString from "/src/lib/getObjectKeyByString";

/**
 * Generates static paths for Next.js based on Strapi collections.
 *
 * The function fetches the specified collection from Strapi, processes the retrieved data
 * to filter and transform the results into paths, and returns the resulting paths in a format
 * suitable for Next.js static site generation.
 *
 * @param args - Contains properties necessary for fetching and processing the data.
 * @returns An array of paths in the format { params: { id: string[] } } for Next.js static site generation.
 *
 * @throws Will throw an error if there's an issue with the data or paths generation.
 */

/**
 * Type definition for the arguments passed to the strapiGetStaticPaths function.
 */
interface StrapiGetStaticPathsArgs {
  collection: string;
  additionalQuery?: string;
  filter?: (item: any) => boolean; // Consider updating 'any' with a more specific type if possible
  slugPath: string;
}

const strapiGetStaticPaths = async ({
  collection,
  additionalQuery,
  filter,
  slugPath,
}: StrapiGetStaticPathsArgs): Promise<{ params: { id: string[] } }[]> => {
  if (!collection || typeof collection !== `string`) {
    throw new Error(`Invalid collection: ${collection}`);
  }

  const data = await strapiGetCollection({ collection, additionalQuery });

  if (!arrayIsValid(data)) {
    throw new Error("Received invalid data from Strapi.");
  }

  const paths = data
    .filter((item) => (filter ? filter(item) : true))
    .map((item) => {
      const slug = getObjectKeyByString(item, slugPath);

      if (!slug) {
        throw new Error(
          `Item missing valid slug.\n${slugPath}: ${slug}\nCollection: ${collection}\nItem: ${JSON.stringify(
            item,
            null,
            2,
          )}`,
        );
      }

      const path = createPathFromSlug(slug);

      if (!path) {
        throw new Error(`Invalid path derived from slug: ${slug}`);
      }

      return { params: { id: path } };
    });

  if (!arrayIsValid(paths)) {
    throw new Error(
      `No valid paths generated from data: ${JSON.stringify(paths, null, 2)}`,
    );
  }

  return paths;
};

/**
 * Transforms a given slug into a path array suitable for Next.js.
 *
 * @param slug - The slug to be transformed.
 * @returns An array representing the path or null if invalid.
 */
const createPathFromSlug = (slug: string): string[] | null => {
  if (slug === "/") return [];

  // Remove starting slash and split by "/"
  const segments = slug.startsWith("/")
    ? slug.slice(1).split("/")
    : slug.split("/");

  // Filter out any empty segments
  return segments.filter(Boolean) || null;
};

export default strapiGetStaticPaths;
