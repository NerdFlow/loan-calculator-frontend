export const formattedNumber = (value: string | number) => {
  // Check if the value is a string, then convert it to a number
  if (typeof value === "string") {
    value = parseInt(value);
  }

  // Apply toLocaleString to the numeric value
  return value.toLocaleString();
};
