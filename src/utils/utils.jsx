// eslint-disable-next-line import/prefer-default-export
export function filterIngredients(data) {
  const res = {};
  // eslint-disable-next-line no-return-assign
  data.forEach((item) => (res[item.type] ? res[item.type].push(item) : res[item.type] = [item]));
  return res;
}
