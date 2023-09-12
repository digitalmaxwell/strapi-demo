import React from "react";
import Image from "/src/components/Image";
// import './_index.scss';

// Define the structure for the Image attributes
interface ImageAttributes {
  url?: string;
  alternativeText?: string;
}

// Define the structure for the image data
interface ImageData {
  attributes: ImageAttributes;
}

// Define the structure for the backgroundImage and backgroundImageMobile props
interface BackgroundImageData {
  image?: {
    data: ImageData;
  };
}

// Define the prop types for the BackgroundImage component
interface BackgroundImageProps {
  backgroundImage?: BackgroundImageData;
  backgroundImageMobile?: BackgroundImageData;
  backgroundImageAlignment?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  backgroundImage,
  backgroundImageMobile,
  backgroundImageAlignment = "", // default to an empty string
}) => {
  if (
    backgroundImage?.image?.data?.attributes?.url ||
    backgroundImageMobile?.image?.data?.attributes?.url
  ) {
    return (
      <>
        {backgroundImage?.image?.data?.attributes?.url ? (
          <Image
            className={`BackgroundImage ${backgroundImageAlignment} ${
              backgroundImageMobile ? "withMobileImage" : ""
            }`}
            src={backgroundImage.image.data.attributes.url}
            alt={
              backgroundImage?.image?.data?.attributes?.alternativeText || ``
            }
          />
        ) : null}
        {backgroundImageMobile?.image?.data?.attributes?.url ? (
          <Image
            className={`BackgroundImageMobile ${backgroundImageAlignment}`}
            src={backgroundImageMobile.image.data.attributes.url}
            alt={
              backgroundImage?.image?.data?.attributes?.alternativeText || ``
            }
          />
        ) : null}
      </>
    );
  } else {
    return null;
  }
};

export default BackgroundImage;
