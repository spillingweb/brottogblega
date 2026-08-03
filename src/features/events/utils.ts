// Function to determine the color of the spots left indicator based on the number of spots left
export const spotsColor = (n: number) => {
  if (n <= 3) return "text-red-600 bg-red-50";
  if (n <= 6) return "text-amber-700 bg-amber-50";
  return "text-emerald-700 bg-emerald-50";
};
