import React, { FC } from "react";
import componentSpacing from "/src/lib/componentSpacing";
import HTML from "/src/components/HTML";
import Image from "/src/components/Image";

// import './_index.scss';

interface MediaBlockProps {
  className?: string;
  spacing?: string;
  image?: {
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
  };
  heading?: string;
  headingClass?: string;
  headingType?: string;
  body?: string;
}

const MediaBlock: FC<MediaBlockProps> = ({
  className,
  spacing,
  image,
  heading,
  headingClass,
  headingType,
  body,
}: MediaBlockProps) => (
  <div className={`${componentSpacing(spacing)}`}>
    {image ? (
      <Image
        className={`mediaBlock__image`}
        src={image.image.data.attributes.url}
        alt={image.image.data.attributes.alternativeText || ""}
      />
    ) : null}
    {heading
      ? React.createElement(
          headingType || "h4",
          {
            className: `mediaBlock__heading ${headingClass || ""}`,
          },
          <HTML>{heading}</HTML>,
        )
      : null}
    {body ? (
      <div className={`MediaBlock__body`}>
        <HTML>{body}</HTML>
      </div>
    ) : null}
  </div>
);

export default MediaBlock;
