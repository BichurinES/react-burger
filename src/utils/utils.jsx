export function filterIngredients(data) {
  const res = {};
  data.forEach(item => res[item.type] ? res[item.type].push(item) : res[item.type] = [item]);
  return res;
}
