export default (number) => {
  const arr = [];
  let i = 0;
  while (arr.length !== number) {
    arr.push(i);
    i += 1;
  }
  return arr;
};
