import React from "react";
import arrayIsValid from "/src/lib/arrayIsValid";

/**
 * StrapiDynamicZone Component
 *
 * A flexible renderer for dynamic content based on Strapi's component system.
 * The component accepts a map of components and data. The keys of the data object
 * determine which component is used, and the associated array provides the props for each
 * instantiation of the component.
 *
 * @component
 * @param {object} props - Props for StrapiDynamicZone component.
 * @param {object} props.components - A key-value object mapping component names to React components.
 * @param {object} props.data - A key-value object where the key is the component name, and the value is an array of data for each component instance.
 * @returns {React.ReactNode} A set of rendered components.
 * @throws Will throw an error if the components or data props are not correctly formatted.
 */

interface StrapiDynamicZoneProps {
  components: { [key: string]: React.ComponentType<any> };
  data: { [key: string]: any[] };
}

const StrapiDynamicZone = ({ components, data }: StrapiDynamicZoneProps) => {
  const componentList: React.ReactNode[] = [];

  if (
    !components ||
    !arrayIsValid(Object.keys(components)) ||
    !data ||
    !arrayIsValid(Object.keys(data))
  ) {
    throw new Error(
      `Error in StrapiDynamicZone: data and components props must contain at least one object.`,
    );
  }

  Object.keys(data).forEach((item) => {
    const sectionData = data[item];
    const Component = components[item];

    if (!Component) {
      throw new Error(
        `Error in StrapiDynamicZone: Component ${item} does not exist in component list.`,
      );
    }

    if (!arrayIsValid(sectionData)) {
      throw new Error(
        `Error in StrapiDynamicZone: sectionData for ${item} is not a valid array. Found: ${sectionData}`,
      );
    }

    sectionData.forEach((componentData) => {
      if (!componentData || !arrayIsValid(Object.keys(componentData))) {
        throw new Error(
          `Error in StrapiDynamicZone: Invalid data for ${item}. Found ${componentData}`,
        );
      }

      componentList.push(
        <Component
          key={`${item}-${componentList.length}`}
          {...componentData}
        />,
      );
    });
  });

  return <>{componentList}</>;
};

export default StrapiDynamicZone;
