import fetch from "node-fetch";

/**
 * strapiFetchGraphQL Function
 *
 * Fetches data from a Strapi CMS using GraphQL. The function constructs a request using the provided
 * GraphQL query string. It requires the Strapi GraphQL endpoint URL and an authentication token to be set
 * in the environment variables. If successful, it returns the fetched data. Otherwise, it throws an error
 * with a detailed message.
 *
 * @throws {Error} Will throw an error if necessary environment variables or query aren't provided or if fetching fails.
 *
 * @returns {Promise<any>} Resolves with the fetched data.
 */

interface StrapiFetchOptions {
  headers?: Record<string, string>;
  method?: string;
  query: string;
}

const strapiFetchGraphQL = async ({
  headers,
  method = `POST`,
  query,
}: StrapiFetchOptions): Promise<any> => {
  const body = query ? JSON.stringify({ query }) : null;
  const bodyJSON = body ? JSON.parse(body) : null;

  if (
    query.includes(`query`) &&
    body &&
    bodyJSON?.query &&
    process.env.STRAPI_GRAPHQL_URL &&
    process.env.STRAPI_GRAPHQL_AUTH_TOKEN
  ) {
    try {
      const response = await fetch(process.env.STRAPI_GRAPHQL_URL, {
        method,
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_GRAPHQL_AUTH_TOKEN}`,
          "Content-Type": "application/json",
          ...headers,
        },
        body,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}\nbodyJSON: ${JSON.stringify(
            bodyJSON,
            null,
            2,
          )}`,
        );
      }

      return await response.json();
    } catch (e) {
      throw new Error(
        `Error in strapiFetchGraphQL: A data-fetching error occurred.\n\n${e}\n\nbodyJSON: ${JSON.stringify(
          bodyJSON,
          null,
          2,
        )}`,
      );
    }
  } else {
    throw new Error(
      `Error in strapiFetchGraphQL: process.env.STRAPI_GRAPHQL_URL, process.env.STRAPI_GRAPHQL_AUTH_TOKEN, and query must be present to fetch data.\n\nquery: ${query}\n\nbody: ${body}\n\nbodyJSON: ${JSON.stringify(
        bodyJSON,
        null,
        2,
      )}\n\nprocess.env.STRAPI_GRAPHQL_URL: ${
        process.env.STRAPI_GRAPHQL_URL
      }\n\nprocess.env.STRAPI_GRAPHQL_AUTH_TOKEN: ${
        process.env.STRAPI_GRAPHQL_AUTH_TOKEN
      }`,
    );
  }
};

export default strapiFetchGraphQL;
