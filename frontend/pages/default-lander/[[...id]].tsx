// Imports and dependencies
import dynamic from "next/dynamic";

// Import Next.js and TypeScript specific types for static site generation
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

// Helper functions for fetching and handling data
import strapiGetCollection from "/src/lib/strapi/getCollection";
import strapiGetStaticPaths from "/src/lib/strapi/getStaticPaths";
import strapiFetchGraphQL from "/src/lib/strapi/fetchGraphQL";
import strapiGetIdBySlug from "/src/lib/strapi/getIdBySlug";
import strapiComponentListIsValid from "/src/lib/strapi/componentListIsValid";
import isMain from "/src/lib/isMain";

// GraphQL queries specific to the default lander collection
import {
  strapiGraphqlQueryCollectionDefaultLander,
  strapiGraphqlQueryMediaBlockComponent,
} from "/src/lib/strapi/graphql/queries";

// Strapi specific components to handle dynamic content and meta data
import StrapiDynamicZone from "/src/components/Strapi/DynamicZone";
import StrapiMeta from "/src/components/Strapi/Meta";

// Components
import Header from "/src/components/Header";
import BackgroundImage from "/src/components/BackgroundImage";
import MediaBlock from "/src/components/MediaBlock";

// Below is an example of how to use dynamic imports to optimize performance:
// const Footer = dynamic(() => import('/src/components/Footer'), {ssr: false});

/**
 * DefaultLander Page
 *
 * The DefaultLander page serves as a universal landing page template, designed to render diverse
 * content using slugs. Leveraging Next.js's static site generation, this page fetches and presents
 * content from Strapi CMS at build time via a collection of helper functions. These functions shape
 * the data retrieval process, defining GraphQL queries and other essentials.
 *
 * Key Features:
 * - `getStaticPaths`: Enumerates the slugs for landing pages set for static generation.
 * - `getStaticProps`: Fetches corresponding Strapi data for a given slug.
 * - Dynamic Imports: Optimizes component loading to enhance performance.
 *
 * The Next.js rewrites configuration in `next.config.js` redirects all top-level slugs to this template.
 * This approach centralizes the rendering of multiple landing pages, offering a flexible architecture
 * without compromising the user's navigational experience.
 */

const slugPath = `attributes.slug`;

/**
 * Generates paths for static site generation based on collection slugs.
 *
 * @returns {GetStaticPathsResult} Paths and fallback configurations.
 */

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await strapiGetStaticPaths({
    collection: `defaultLanders`,
    additionalQuery: `#graphql
        attributes {
          slug
        }
      `,
    slugPath,
  });

  return {
    paths,
    fallback: false, // Indicates if other routes not returned should be treated as 404
  };
};

/**
 * getStaticProps - Fetches data for static site generation based on slug.
 *
 * This function follows four primary steps for the DefaultLander:
 * 1. **getCollection**: Fetches the full collection to ensure a relationship between slugs and IDs.
 * 2. **getId**: Retrieves the ID corresponding to the slug provided in the current context.
 * 3. **Query**: Constructs and executes the GraphQL query specific to the fetched ID.
 * 4. **Return Data**: If the fetched data is valid, returns it. Otherwise, handles errors or 404 scenarios.
 *
 * The fetched data is then passed to the DefaultLander component, which takes care of pairing queries with components.
 *
 * @param {StaticPropsContext} context - Contains parameters and context for the current static page.
 * @returns {GetStaticPropsResult} Object containing the fetched data as props, or error/404 configurations.
 */

// Custom type to ensure the expected params structure in the context of getStaticProps
interface StaticPropsContext extends GetStaticPropsContext {
  params: {
    id: string[];
  };
}

export const getStaticProps = async (context: StaticPropsContext) => {
  // Step 1: Get Collection
  const collection = await strapiGetCollection({
    collection: `defaultLanders`,
    additionalQuery: `#graphql
        attributes {
          slug
        }
      `,
  });

  // Step 2: Get ID based on slug
  const id = strapiGetIdBySlug({
    collection,
    slug: context?.params?.id,
    slugPath,
  });

  console.log('id', id)

  // Step 3: Construct and Execute GraphQL Query
  const query = `#graphql
      query {
        defaultLander(id: ${id}) {
          data {
            ${strapiGraphqlQueryCollectionDefaultLander}
            components: attributes {
							MediaBlock: components {
								${strapiGraphqlQueryMediaBlockComponent}
							}
            }
          }
        }
      }
    `;

  const pageData = await strapiFetchGraphQL({ query });

  // Step 4: Return Data or Handle Errors/404
  const slugData = pageData?.data?.defaultLander?.data?.attributes?.slug;
  const componentsData = pageData?.data?.defaultLander?.data?.components;

  if (slugData && strapiComponentListIsValid(componentsData)) {
    return {
      props: {
        pageData,
      },
      revalidate: process.env.revalidate ? process.env.revalidateTime : false,
    };
  } else if (!isMain) {
    return {
      notFound: true, // Returns 404 page with status code 404
    };
  } else {
    throw new Error(
      `Error in DefaultLander getStaticProps: invalid page data.\n\nslug: ${slugData}\n\ncomponents: ${componentsData}`,
    );
  }
};

/**
 * `DefaultLander` Main Component
 *
 * The heart of the template, this component is your canvas for creativity and customization.
 * Here, you get the opportunity to define the static/dynamic features tailored to your template.
 *
 * The `StrapiDynamicZone` is pivotal, ensuring a seamless pairing of components with their respective Strapi CMS GraphQL queries.
 * It's the bridge connecting your components with dynamic content from the CMS.
 *
 * Dive in and give your template a unique twist!
 *
 * Prop Type Inference:
 * Using the `InferGetStaticPropsType`, the prop types are inferred from the return type of `getStaticProps`.
 * This dynamic approach avoids manual type updates when the CMS schema changes. Always test after CMS updates
 * to ensure the correct rendering of the component.
 *
 * @param {InferGetStaticPropsType<typeof getStaticProps>} props - The fetched data from Strapi CMS.
 * @returns {JSX.Element} The rendered content of the landing page.
 */

const DefaultLander = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  // Extract necessary data for rendering and apply optional chaining for safety
  const pageClass =
    props?.pageData?.data?.defaultLander?.data?.attributes?.pageClass;
  const backgroundColor =
    props.pageData?.data?.defaultLander?.data?.attributes?.backgroundColor;
  const backgroundImage =
    props.pageData?.data?.defaultLander?.data?.attributes?.backgroundImage;
  const headerData =
    props?.pageData?.data?.defaultLander?.data?.attributes?.header?.data
      ?.attributes;
  const headerEnabled =
    props?.pageData?.data?.defaultLander?.data?.attributes?.navigationOptions
      ?.header?.enabled;

  return (
    <div
      className={`${pageClass ? pageClass : ``} ${
        backgroundColor?.color
          ? `backgroundColor--${backgroundColor.color}`
          : ``
      }`}
    >
      {/* Inject meta tags and SEO content based on Strapi data */}
      <StrapiMeta seo={...props.pageData.data.defaultLander.data.attributes} />

      {/* add static components below as needed */}
      {/* <Header enabled={headerEnabled} {...headerData} /> */}
      <h1>Header should go here</h1>
      <main>
        <BackgroundImage {...backgroundImage} />
        {/* Handle dynamic content sections from Strapi */}
        <StrapiDynamicZone
          components={{
            MediaBlock: MediaBlock,
          }}
          data={props.pageData.data.defaultLander.data.components}
        />
      </main>
      <h1>Footer goes here</h1>
    </div>
  );
};

export default DefaultLander;
