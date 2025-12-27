export const formatPrice = (price) => {
  if (price === undefined || price === null || price === "") return "₹0";
  const cleanNumber = parseFloat(String(price).replace(/[₹$,]/g, ""));
  if (isNaN(cleanNumber)) return "₹0";
  return `₹${cleanNumber.toLocaleString("en-IN")}`;
};