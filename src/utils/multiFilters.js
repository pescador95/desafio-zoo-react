export const makeMultiFilterParams = (...data) => {
  let strgFilter = "";
  let quote = "'";

  data.forEach((key, value) => {
    strgFilter += "and " + key + " like" + quote + "%" + value + "%" + quote;
    console.log(key, value);
    console.log(strgFilter);
  });
  return strgFilter;
};
