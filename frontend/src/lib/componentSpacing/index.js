import arrayIsValid from "/src/lib/arrayIsValid";

const componentSpacing = (spacingObject) => {
  if (
    spacingObject &&
    typeof spacingObject === `object` &&
    arrayIsValid(Object.values(spacingObject))
  ) {
    return Object.values(spacingObject)
      .map((value) => value.replace(`_`, `--`))
      .join(` `);
  } else {
    console.error(
      `Error in componentSpacing: invalid spacingObject.\n\nspacingObject: ${
        spacingObject && typeof spacingObject === `object`
          ? JSON.stringify(spacingObject, null, 2)
          : spacingObject
      }`,
    );
    return ``;
  }
};

export default componentSpacing;
