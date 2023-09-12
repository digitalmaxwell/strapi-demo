import React from "react";
import parseHTML from "html-react-parser";

interface HTMLProps {
  children?: string;
}

const HTML = ({ children }: HTMLProps) => {
  if (children) return parseHTML(children);
  else {
    throw new Error(`Error: No children passed into HTML component`);
  }
};

export default HTML;
