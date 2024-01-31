import React, { useEffect, useRef, useState } from "react";

interface ObserverOptions {
  rootMargin?: string;
  threshold?: number;
}

interface ImageProps {
  alt?: string;
  lazy?: boolean;
  observerOptions?: ObserverOptions;
  onEnter?: () => void;
  onLeave?: () => void;
  src?: string;
  [x: string]: any; // This is a catch-all for any other props not explicitly defined
}

const Image: React.FC<ImageProps> = ({
  alt = "",
  lazy = false,
  observerOptions = {
    rootMargin: "0px 0px 50% 0px",
    threshold: 0,
  },
  onEnter = () => { },
  onLeave = () => { },
  src,
  ...otherProps
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (lazy) {
      const currentRef = imageRef.current;

      const checkElement = (
        elements: IntersectionObserverEntry[],
        observer: IntersectionObserver,
      ) => {
        const [element] = elements;
        setIsVisible(element.isIntersecting);

        if (isVisible) {
          onEnter();
          if (currentRef) observer.unobserve(currentRef);

          return () => {
            if (currentRef) observer.unobserve(currentRef);
          };
        } else {
          onLeave();
        }
      };

      const observer = new IntersectionObserver(checkElement, observerOptions);
      if (currentRef) observer.observe(currentRef);

      return () => {
        if (currentRef) observer.unobserve(currentRef);
      };
    }
  }, [isVisible, lazy, observerOptions, onEnter, onLeave]);

  if (src) {
    return (
      <img
        ref={imageRef}
        src={`${lazy && !isVisible ? `/assets/images/blank.gif` : process.env.NODE_ENV === 'development' ? 'http://localhost:1337' + src : src}`}
        alt={alt}
        loading={`${lazy ? `lazy` : `eager`}`}
        {...otherProps}
      />
    );
  } else {
    throw new Error(
      `Error in Image: Expected "src" in props, found "${src?.toString()}"`,
    );
  }
};

export default Image;
