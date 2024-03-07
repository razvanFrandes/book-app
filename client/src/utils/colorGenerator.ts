const colorGenerator = (categoryColor: string, index: number) => {
  // Generate variations of the category color for subcategories
  const hue = parseInt(categoryColor.slice(1, 3), 16);
  const saturation = parseInt(categoryColor.slice(3, 5), 16);
  const lightness = parseInt(categoryColor.slice(5), 16);

  // Adjust the lightness based on the subcategory index
  const adjustedLightness = lightness + (index + 1) * 30;
  const newLightness = Math.min(adjustedLightness, 255);

  // Convert the new color values back to hexadecimal
  const newColor = `#${hue.toString(16).padStart(2, "0")}${saturation
    .toString(16)
    .padStart(2, "0")}${newLightness.toString(16).padStart(2, "0")}`;

  return newColor;
};

export default colorGenerator;
