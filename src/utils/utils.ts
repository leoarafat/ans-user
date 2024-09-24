export function generateISRC() {
  const prefix = "BDA1U24";
  const randomNumber = Math.floor(Math.random() * 99999) + 1;
  const paddedNumber = randomNumber.toString().padStart(5, "0");
  return `${prefix}${paddedNumber}`;
}
