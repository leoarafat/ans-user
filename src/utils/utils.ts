// export function generateISRC() {
//   const prefix = "BDA1U24";
//   const randomNumber = Math.floor(Math.random() * 99999) + 1;
//   const paddedNumber = randomNumber.toString().padStart(5, "0");
//   return `${prefix}${paddedNumber}`;
// }
const generatedISRCs = new Set();

export function generateISRC() {
  const prefix = "BDA1U24";

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const randomNumber = Math.floor(Math.random() * 99999) + 1;
    const paddedNumber = randomNumber.toString().padStart(5, "0");
    const newISRC = `${prefix}${paddedNumber}`;

    if (!generatedISRCs.has(newISRC)) {
      generatedISRCs.add(newISRC);
      return newISRC;
    }
  }
}
