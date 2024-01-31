export const strapiGraphqlQueryCollection = `#graphql
  id
`;

// ======================= Image =======================

export const strapiGraphqlQueryImage = `#graphql
  image {
    data {
      attributes {
        alternativeText
        url
      }
    }
  }
  lazy
`;

// ======================= SEO =======================

export const strapiGraphqlQuerySeo = `#graphql
  seo {
    metaTitle
    metaDescription
    canonicalURL
    metaRobots
    metaImage {
      ${strapiGraphqlQueryImage}
    }
  }
`;

// ======================= Link =======================

export const strapiGraphqlQueryLink = `#graphql
  href
  target
  rel
  ariaLabel
`;

// ======================= Navigation Options =======================

export const strapiGraphqlQueryNavigationOptions = `#graphql
  header {
    enabled
  }
  footer {
    enabled
  }
  responsiveNav {
    enabled
  }
  colorTheme {
    theme
  }
`;

// ======================= Header =======================

export const strapiGraphqlQueryHeader = `#graphql
  attributes {
    primaryNavigation {
      data {
        attributes {
          name
          primaryNavItems {
            title
            link {
              ${strapiGraphqlQueryLink}
            }
            hasSubMenu
            subMenuLinks {
              title
              link {
                ${strapiGraphqlQueryLink}
              }
            }
          }
        }
      }
    }
    secondaryNavigation {
      data {
        attributes {
          secondaryNavItems {
            title
            type
            link {
              ${strapiGraphqlQueryLink}
            }
            hasSubMenu
            subMenuLinks {
              title
              link {
                ${strapiGraphqlQueryLink}
              }
            }
          }
        }
      }
    }
  }
`;

// ======================= Footer =======================

export const strapiGraphqlQueryFooter = `#graphql
	attributes {
		socialLinks {
			data {
				title
				link {
						${strapiGraphqlQueryLink}
				}
			}
		}
		legal {
			data {
				attributes {
					copyright
					links {
						title
						link {
							${strapiGraphqlQueryLink}
						}
					}
				}
			}
		}
	}
`;

// ======================= backgroundImage =======================

export const strapiGraphqlQueryBackgroundImage = `#graphql
  backgroundImage {
    ${strapiGraphqlQueryImage}
  }
  backgroundImageMobile {
    ${strapiGraphqlQueryImage}
  }
  backgroundImageAlignment
`;

// ======================= Default Lander =======================

export const strapiGraphqlQueryCollectionDefaultLander = `#graphql
  ${strapiGraphqlQueryCollection}
  attributes {
    pageClass
    slug
  }
`;

// ======================= Spacing =======================

export const strapiGraphqlQuerySpacing = `#graphql
  marginBottom
  marginTop
  paddingBottom
  paddingTop
`;

// ======================= ComponentGlobals =======================

export const strapiGraphqlQueryComponentGlobals = `#graphql
  componentId
  className
  spacing {
    ${strapiGraphqlQuerySpacing}
  }
`;

// ======================= Media Block =======================

export const strapiGraphqlQueryMediaBlock = `#graphql
  heading
  headingClass
  headingType
  body
  bodyList {
    heading
    body
  }
  imageWidth
  gridExtend
  rowExtend
  imageExtend
  reverse
  image {
    ${strapiGraphqlQueryImage}
  }

  ctas {
    ctaType
    text
    link {
      ${strapiGraphqlQueryLink}
    }
  }
  maxContentWidth
  align
  responsiveTextAlign
`;

export const strapiGraphqlQueryMediaBlockComponent = `#graphql
  ...on ComponentMediaMediaBlock {
    ${strapiGraphqlQueryComponentGlobals}
    ${strapiGraphqlQueryMediaBlock}
  }
`;
