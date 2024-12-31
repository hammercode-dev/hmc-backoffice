export function delay(delayInMS: number = 200) {
  return new Promise((resolve) => {
    setTimeout(resolve, delayInMS);
  });
}
