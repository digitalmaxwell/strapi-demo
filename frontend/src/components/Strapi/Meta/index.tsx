import Head from "next/head";

/**
 * `StrapiMeta` Component
 *
 * A component responsible for populating meta tags based on provided SEO data from Strapi.
 * Meta tags play a crucial role in ensuring the website's compatibility with search engines
 * and social platforms. The component optimizes SEO and social sharing capabilities.
 *
 * @param {MetaProps} props - The props to be passed into the component.
 * @returns {JSX.Element} A collection of meta tags for SEO and social sharing purposes.
 */

interface ImageAttributes {
  url?: string;
  alternativeText?: string;
}

interface SeoProps {
  metaTitle?: string;
  canonicalUrl?: string;
  slug: string;
  metaDescription?: string;
  metaType?: string;
  metaRobots?: string;
  metaImage?: {
    image?: {
      data?: {
        attributes?: ImageAttributes;
      };
    };
  };
}

interface MetaProps {
  seo?: SeoProps;
}

const StrapiMeta = ({ seo }: MetaProps) => {
  // Construct the full URL by combining the base URL with the slug.
  // The regex `.replace(/\/\/+/g, '/')` ensures that any occurrence of
  // consecutive slashes is replaced with a single slash, preventing issues with malformed URLs.
  const baseURL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_URL_PROD
      : process.env.NEXT_PUBLIC_BASE_URL_DEV;
  const fullURL = seo?.slug
    ? `${baseURL}/${seo.slug}`.replace(/\/\/+/g, "/")
    : undefined;

  // Cache busting for images:
  // Appending the current timestamp (in ms) to the image URL ensures that the browser
  // and various platforms always fetch the latest version of the image,
  // preventing any caching issues that might show outdated images.
  const ms = new Date().getTime();
  const defaultImage = "/assets/images/meta/default-meta-image.jpg";
  const imageSrc = seo?.metaImage?.image?.data?.attributes?.url || defaultImage;

  return (
    <Head>
      {seo?.metaTitle && <title>{seo?.metaTitle}</title>}
      {seo?.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
      {renderMetaTag({ property: "og:title", content: seo?.metaTitle })}
      {renderMetaTag({
        property: "description",
        name: "description",
        content: seo?.metaDescription,
      })}
      {renderMetaTag({
        property: "og:description",
        content: seo?.metaDescription,
      })}
      {renderMetaTag({ property: "og:type", content: seo?.metaType })}
      {renderMetaTag({ property: "og:url", content: fullURL })}
      {renderMetaTag({
        property: "og:image:alt",
        content: seo?.metaImage?.image?.data?.attributes?.alternativeText,
      })}
      {renderMetaTag({ property: "og:image", content: `${imageSrc}?${ms}` })}
      {renderMetaTag({
        property: "twitter:image",
        content: `${imageSrc}?${ms}`,
      })}
      {renderMetaTag({ name: "robots", content: seo?.metaRobots })}
    </Head>
  );
};

/**
 * Renders a meta tag based on provided property, content, and name.
 *
 * @param {string | undefined} property - The property attribute for the meta tag.
 * @param {string | undefined} content - The content attribute for the meta tag.
 * @param {string | undefined} [name] - The name attribute for the meta tag (optional).
 * @returns {JSX.Element | null} The rendered meta tag or null if content is not provided.
 */

interface MetaTagProps {
  content?: string;
  property?: string;
  name?: string;
}

const renderMetaTag = ({ content, property, name }: MetaTagProps) => {
  if (!content) return null;
  if (name) return <meta name={name} content={content} />;
  if (property) return <meta property={property} content={content} />;

  return null;
};

export default StrapiMeta;
