import { DATAS } from "./constants";

export const makeMultiFilterParams = (obj) => {
  let query = "";

  Object.keys(obj)?.forEach((key, index, arr) => {
    if (DATAS.includes(key)) {
      return (query = query.concat(
        `${index != arr?.length ? "and" : ""} ${key} = '${obj[key]}' `
      ));
    }
    query = query.concat(
      `${index != arr?.length ? "and" : ""} ${key} like '%${obj[key]}%' `
    );
  });

  return query;
};
