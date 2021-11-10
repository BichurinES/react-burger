export function filterIngredients(data, keys) {
  const res = {};
  keys.forEach(key => res[key] = []);
  data.forEach(item => res.hasOwnProperty(item.type) && res[item.type].push(item));
  return res;
}
