export const upperSnakeToCamel = (str: string) => {
  str = str.replace("SET_", "");
  const words = str.toLowerCase().split("_");
  const pascal = words
    .map((word, i) => {
      return (
        (i === 0 ? word.charAt(0) : word.charAt(0).toUpperCase()) +
        word.slice(1)
      );
    })
    .join("");

  return pascal;
};
